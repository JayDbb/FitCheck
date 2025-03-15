const express = require('express');
const router = express.Router();

router.use('/users', require('../api/users/routes'));
router.use('/posts', require('../api/posts/routes'));

module.exports = router;
