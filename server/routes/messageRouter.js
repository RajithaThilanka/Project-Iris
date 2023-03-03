const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').post(authController.protect, messageController.sendMessage);
router
  .route('/:chatId')
  .get(authController.protect, messageController.allMessages);

module.exports = router;
