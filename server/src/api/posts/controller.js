const { v4: uuidv4 } = require('uuid');
const Post = require('./model');
const s3 = require("../../config/s3")
const User = require("../users/model");
const OpenAI = require('openai');
const { shortenBase64Image } = require('../../util/shortenbase64');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Creates a new post.
 * @body {string} userID - The ID of the user creating the post.
 * @body {string} imageBase64 - The base64 encoded image.
 * @body {string} type - The type of post (e.g., "outfit").
 * @body {string} caption - The caption for the post.
 * @body {string} taggedShirt - The tagged shirt in the outfit.
 * @body {string} taggedPants - The tagged pants in the outfit.
 * @body {string} taggedShoes - The tagged shoes in the outfit.
 * @body {string} category - The fashion category (e.g., "streetwear").
 * @body {number} AIrating - The AI-generated rating for the outfit.
 */
const createPost = async (req, res) => {
    try {
        const {
            userID,
            imageBase64,
            type,
            caption,
            taggedShirt,
            taggedPants,
            taggedShoes,
            category,
            AIrating
        } = req.body;

        const relatedText = await scanImage({ body: { imageUrl: imageBase64, category, isLocal: true } }, res);

        // Convert Base64 image to buffer
        const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");

        // Generate a unique filename
        const fileName = `uploads/${uuidv4()}.jpg`;

        // S3 upload parameters
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: 'image/jpeg',
        };

        // Upload to S3
        const uploadResult = await s3.upload(uploadParams).promise();
        const imageUrl = uploadResult.Location;

        // Create post
        const post = await Post.create({
            writterID: userID,
            createdDate: new Date().toISOString(),
            imageURL: imageUrl,
            type,
            caption,
            taggedClothes: [{ taggedShirt, taggedPants, taggedShoes }],
            AIrating,
            category,
            searchTags: relatedText
        });

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post', error });
    }
};

/**
 * Searches for posts based on query.
 * @query {string} q - The search term to filter posts by tags, caption, or category.
 */
const searchPosts = async (req, res) => {
    const { q } = req.query;
    console.log(q);
    
    const posts = await Post.find({
        $or: [
            { searchTags: { $elemMatch: { $regex: q, $options: "i" } } }, // Partial match in searchTags array
            { caption: { $regex: q, $options: "i" } }, // Case-insensitive match in caption
            { category: { $regex: q, $options: "i" } } // Case-insensitive match in category
        ]
    });

    console.log(posts);
    res.status(200).json(posts);
};

/**
 * Extracts searchable keywords from an outfit image.
 * @body {string} imageUrl - The image URL or base64 string.
 * @body {string} category - The category of the outfit.
 */
const scanImage = async (req, res) => {
    const { imageUrl, category } = req.body;

    if (!imageUrl || !category) {
        return res.status(400).json({ message: 'Image and category are required' });
    }

    const client = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: OPENROUTER_API_KEY,
    });

    try {
        const response = await client.chat.completions.create({
            "model": "openai/gpt-4o-mini",
            "messages": [
                {
                    "role": "system",
                    "content": "Extract relevant searchable keywords..."
                },
                {
                    "role": "user",
                    "content": [
                        { "type": "text", "text": `Category: ${category}\nExtract relevant keywords...` },
                        { "type": "image_url", "image_url": imageUrl }
                    ]
                }
            ],
            "max_tokens": 50
        });

        const aiResponse = response.choices[0].message.content.split(",").map(tag => tag.trim());

        if (req.body.isLocal) {
            return aiResponse;
        } else {
            return res.status(200).json({ searchTags: aiResponse });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing image', error: error.message });
    }
};

/**
 * Deletes a post.
 * @body {string} postID - The ID of the post to delete.
 */
const deletePost = async (req, res) => {
    try {
        const { postID } = req.body;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};

/**
 * Retrieves posts by a specific user.
 * @query {string} username - The username to fetch posts for.
 */
const getUserPosts = async (req, res) => {
    const username = req.query.username;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ writterID: user.username });
    res.status(200).json(posts);
};

/**
 * Adds a comment to a post.
 * @body {string} postID - The ID of the post to comment on.
 * @body {string} comment - The comment text.
 * @body {string} commentUser - The user who posted the comment.
 */
const addComment = async (req, res) => {
    try {
        const { postID, comment, commentUser } = req.body;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push({ userID: commentUser, comment });
        await post.save();

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

/**
 * Adds a rating to a post.
 * @body {string} postID - The ID of the post to rate.
 * @body {number} rating - The rating value.
 * @body {string} ratingUser - The user who gave the rating.
 */
const addRating = async (req, res) => {
    try {
        const { postID, rating, ratingUser } = req.body;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.ratings.some(r => r.userID === ratingUser)) {
            post.ratings = post.ratings.map(r => (r.userID === ratingUser ? { ...r, rating } : r));
        } else {
            post.ratings.push({ userID: ratingUser, rating });
        }

        post.overallRating = post.ratings.reduce((acc, r) => acc + r.rating, 0) / post.ratings.length;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error adding rating', error });
    }
};

module.exports = {
    createPost,
    deletePost,
    addComment,
    addRating,
    getUserPosts,
    scanImage,
    searchPosts
};
