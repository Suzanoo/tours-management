const express = require('express');

const authCtrl = require('../controller/authController');
const { textCompletion } = require('../utils/textCompletion');

const router = express.Router();

// Protect routes
router.use(authCtrl.protect);
router.post('/', textCompletion);

module.exports = router;
