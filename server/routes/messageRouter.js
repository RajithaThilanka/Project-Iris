const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');
const aiController = require('../controllers/aiController');
const router = express.Router();
router.route('/validate').get(aiController.validateChat);
router
  .route('/:chatId')
  .get(authController.protect, messageController.allMessages);
router.route('/').post(authController.protect, messageController.sendMessage);
router
  .route('/setSeen/:id')
  .patch(authController.protect, messageController.setSeen);

module.exports = router;
