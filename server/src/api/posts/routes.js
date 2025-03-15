const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/create-post', controller.createPost);
router.get('/get-posts', controller.getPosts);

module.exports = router;
