const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/create-post', controller.createPost);
router.post('/add-rating', controller.addRating);
router.post('/add-comment', controller.addComment);

router.get('/get-posts', controller.getPosts);

module.exports = router;
