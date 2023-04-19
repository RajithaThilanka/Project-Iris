const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');
const aiController = require('../controllers/aiController');
const router = express.Router();
router.route('/validate').get(aiController.getValidatedResponse);
router
  .route('/:chatId')
  .get(
    authController.protect,
    messageController.checkChatBlocked,
    messageController.allMessages
  );
router
  .route('/')
  .post(
    authController.protect,
    messageController.checkChatBlocked,
    messageController.sendMessage
  );
router
  .route('/setSeen/:id')
  .patch(authController.protect, messageController.setSeen);
router
  .route('/setSeenAll/:id')
  .patch(authController.protect, messageController.setSeenAll);
module.exports = router;
