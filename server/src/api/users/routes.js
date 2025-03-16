const express = require('express');
const controller = require('./controller');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');

router.post('/create', controller.createUser);
router.get('/get', authMiddleware, controller.getUser);
router.post('/follow', authMiddleware, controller.followUser);
router.post('/unfollow', authMiddleware, controller.unfollowUser);

module.exports = router;
