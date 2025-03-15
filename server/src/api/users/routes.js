const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/create', controller.createUser);
router.get('/get', controller.getUser);

module.exports = router;
