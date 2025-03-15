const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const postSchema = new mongoose.Schema({
    writterID: String,
    createdDate: String,
    ratings: [{}],
    comments: [{}],
    taggedClothes: [{
        taggedShirt: String,
        taggedPants: String,
        taggedShoes: String
    }],
    overallRating: Number,
    type: String,
    imageURL: String,
    caption: String,
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
