const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

router.route('/').post(messageController.addMessage);
router.route('/:chatId').get(messageController.getMessages);

module.exports = router;
