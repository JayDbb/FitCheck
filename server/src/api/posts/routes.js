const express = require('express');
const controller = require('./controller');
const router = express.Router();
const verifyToken = require("../auth/authMiddleware");

router.post('/create-post', verifyToken, controller.createPost); 
router.post('/add-rating', verifyToken, controller.addRating);
router.post('/add-comment',verifyToken, controller.addComment);
router.post('/get-ai-rating',verifyToken, controller.getAIrating);
router.post('/scan-image',verifyToken, controller.scanImage);

router.get('/get-posts', controller.getUserPosts);
router.get('/search', controller.searchPosts);
router.get('/load-feed', controller.loadFeed);

router.delete('/delete-post',verifyToken, controller.deletePost);


module.exports = router;