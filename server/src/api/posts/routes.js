const express = require('express');
const controller = require('./controller');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
authMiddleware,
router.post('/create-post',authMiddleware,  controller.createPost); 
router.post('/add-rating',authMiddleware,  controller.addRating);
router.post('/add-comment', authMiddleware,controller.addComment);
router.post('/get-ai-rating',authMiddleware, controller.getAIrating);
router.post('/scan-image',authMiddleware, controller.scanImage);

router.get('/get-posts', authMiddleware,controller.getUserPosts);
router.get('/search', authMiddleware,controller.searchPosts);
router.get('/load-feed', controller.loadFeed);

router.delete('/delete-post', controller.deletePost);


module.exports = router;