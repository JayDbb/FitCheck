const express = require('express');
const router = express.Router();
const authMiddleware = require('../api/auth/authMiddleware');

router.use('/users', authMiddleware, require('../api/users/routes'));
router.use('/posts', authMiddleware, require('../api/posts/routes'));
router.use('/auth', require('../api/auth/routes'));

module.exports = router;
