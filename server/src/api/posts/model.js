const mongoose = require('mongoose');

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
    searchTags: [String],
    AIrating: Number,
    category: String
});


const Post = mongoose.model('Posts', postSchema);
// Post.collection.createIndex({ searchTags: "text", caption: "text", category: "text" });

// Create text index for searchTags
// Post.collection.dropIndex("searchTags_text_caption_text").then(() => {
// });


module.exports = Post;
