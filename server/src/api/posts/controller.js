const { v4: uuidv4 } = require('uuid');
const Post  = require('./model');
const s3 = require("../../config/s3")
const User = require("../users/model");


const createPost = async (req, res) => {
    try {

        const { 
            userID, 
            imageBase64, 
            type, 
            caption, 
            taggedShirt, 
            taggedPants, 
            taggedShoes 
        } = req.body;

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

        // Create post with S3 image URL
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
            ]
        });

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post', error });
    }
};


const addComment = async (req, res) => {
    try {
        const { postID, comment, commentUser } = req.body;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

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
                if (r.userID !== ratingUser){
                    r.rating = rating;
                }

                return r
            });
        }else{
            post.ratings.push({
                userID: ratingUser,
                rating
            });

        }


        post.overallRating = post.ratings.reduce((acc, r) => acc + r.rating, 0) / post.ratings.length;

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding rating', error });
    }
}



const getPosts = async (req, res) => {
    const search = req.query.search;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
}





module.exports = {
    createPost,
    getPosts
};
