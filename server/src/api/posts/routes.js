const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/create-post',  controller.createPost); 
router.post('/add-rating',  controller.addRating);
router.post('/add-comment', controller.addComment);
router.post('/get-ai-rating', controller.getAIrating);
router.post('/scan-image', controller.scanImage);

router.get('/get-posts',  controller.getUserPosts);
router.get('/search',  controller.searchPosts);

router.delete('/delete-post', controller.deletePost);


module.exports = router;