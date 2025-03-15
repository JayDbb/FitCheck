const { v4: uuidv4 } = require('uuid');
const Post = require('./model');
const s3 = require("../../config/s3")
const User = require("../users/model");
const OpenAI = require('openai');
const { shortenBase64Image } = require('../../util/shortenbase64');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;



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


        const relatedText = await scanImage({ body: { imageUrl: imageBase64, category, isLocal: true } }, res)

        // console.log(!userID, !imageBase64, !type);  

        // if (!userID || !imageBase64 || !type) {
        //     return res.status(400).json({ message: 'userID, imageBase64 and type are required' });
        // }

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
            // ACL: 'public-read'
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
            taggedClothes: [
                {
                    taggedShirt,
                    taggedPants,
                    taggedShoes
                }
            ],
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

const searchPosts = async (req, res) => {
    const { q } = req.query;
    console.log(q)
    const posts = await Post.find({
        $or: [
            { searchTags: { $elemMatch: { $regex: q, $options: "i" } } }, // Partial match in searchTags array
            { caption: { $regex: q, $options: "i" } }, // Case-insensitive match in caption
            { category: { $regex: q, $options: "i" } } // Case-insensitive match in category
        ]
    });
    
    console.log(posts)


    res.status(200).json(posts);
};

// const scanImage = async ( category, imageUrl ) => {
const scanImage = async (req, res) => {
    

    const { imageUrl, category } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ message: 'No image provided' });
    }

    if (!category) {
        return res.status(400).json({ message: 'No category provided' });
    }

    const client = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: OPENROUTER_API_KEY,
    });

    try {


        // Send request to OpenAI's GPT-4o model
        const response = await client.chat.completions.create({
            "model": "openai/gpt-4o-mini",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a fashion analysis expert. Your task is to extract relevant searchable keywords from an outfit image based on the provided category. \n\nAnalyze the outfit and generate a comma-separated list of keywords related to:\n\n- Clothing items (e.g., jeans, blazer, sneakers)\n- Colors (e.g., black, white, navy)\n- Patterns or textures (e.g., striped, floral, leather)\n- Style categories (e.g., casual, streetwear, formal, minimalistic)\n- Accessories (e.g., sunglasses, belt, handbag)\n\n**Output Format:**\nReturn only a comma-separated list of keywords with no extra text, commentary, or explanation.\n\n**Example Output:**\n```\nblack pants, white sneakers, oversized hoodie, streetwear, casual, modern\n```"
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": `Category: ${category}\nExtract relevant keywords from the outfit and return them in a comma-separated format only.`
                        },
                        { "type": "image_url", "image_url": imageUrl }
                    ]
                }
            ],
            "max_tokens": 50
        }
            ,
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // console.log(response.choices[0].message.content)
        const aiResponse = response.choices[0].message.content.split(",").map(tag => tag.trim());

        if (req.body.isLocal) {
            return aiResponse;
        }else{

            return res.status(200).json({ searchTags: aiResponse.split(',') });
        }

    } catch (error) {
        console.error('Error getting AI rating:', error);
        res.status(500).json({ message: 'Error getting AI rating', error: error.message });
    }
};



const getAIrating = async (req, res) => {
    // const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    const client = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: OPENROUTER_API_KEY,
    });

    try {
        const { imageUrl, category } = req.body;


        if (!imageUrl) {
            return res.status(400).json({ message: 'No image provided' });
        }


        // imageUrl = shortenBase64Image(imageUrl)


        // Send request to OpenAI's GPT-4o model
        const response = await client.chat.completions.create({
            "model": "openai/gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a fashion analysis expert. Your task is to evaluate outfits based on the provided image and a category given by the user. Analyze the outfit according to the following criteria:\n\n1. Fit with Category – Does the outfit align with the given category (e.g., formalwear, streetwear, casual, etc.)?\n2. Color Harmony – Are the colors well-matched and aesthetically pleasing?\n3. Trendy Factor – Does the outfit align with current fashion trends?\n4. Accessory Matching – Do the accessories complement the outfit well?\n5. Overall Aesthetic Score – General impression of the outfit's coherence and appeal.\n\nProvide a final rating out of 5 based on the above factors. Output only the numerical rating (e.g., '4.2', '3.0', '5', etc.), without any extra text, commentary, or explanation."
                },
                {
                    "role": "user",
                    "content": [
                        { "type": "text", "text": `Category: ${category}\nRate this outfit based on the provided category. Only return a single number (out of 5) that reflects the overall score based on fit, color harmony, trendiness, accessory matching, and aesthetics. Do not include any extra text or explanation—just the number.` },
                        { "type": "image_url", "image_url": imageUrl }
                    ]
                }
            ],
            "max_tokens": 10
        }
            ,
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiResponse = response.choices[0].message.content;

        res.status(200).json({ rating: aiResponse });

    } catch (error) {
        console.error('Error getting AI rating:', error);
        res.status(500).json({ message: 'Error getting AI rating', error: error.message });
    }
};


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
        console.error(error);
        res.status(500).json({ message: 'Error deleting post', error });

    }
};

const getSimilarPosts = async (req, res) => {
    try {
        const { postID } = req.body;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const similarPosts = await Post.find({
            $or: [
                { category: post.category },
                { searchTags: { $in: post.searchTags } }
            ]
        }).limit(5);

        res.status(200).json(similarPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting similar posts', error });
    }
};


const addComment = async (req, res) => {
    try {
        const { postID, comment, commentUser } = req.body;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Add Comments to post Array
        post.comments.push({
            userID: commentUser,
            comment
        });

        await post.save();

        res.status(200).json(post);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding comment', error });
    }
};


const addRating = async (req, res) => {
    try {
        const { postID, rating, ratingUser } = req.body;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.ratings.some(r => r.userID === ratingUser)) {
            post.ratings = post.ratings.map(r => {

                //Update rating if rating already given by user
                if (r.userID !== ratingUser) {
                    r.rating = rating;
                }

                return r
            });
        } else {
            post.ratings.push({
                userID: ratingUser,
                rating
            });

        }
        await post.save();

        post.overallRating = post.ratings.reduce((acc, r) => acc + r.rating, 0) / post.ratings.length;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding rating', error });
    }
}



const getUserPosts = async (req, res) => {
    const username = req.query.username;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({
        writterID: user.username
    });

    res.status(200).json(posts);
}





module.exports = {
    createPost,
    deletePost,
    addComment,
    addRating,
    getAIrating,
    getUserPosts,
    scanImage,
    searchPosts
};
