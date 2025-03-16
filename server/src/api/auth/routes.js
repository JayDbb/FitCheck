const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.post('/getToken', controller.createToken);

module.exports = router;
