const express = require('express');
const chatController = require('../controllers/chatController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').post(authController.protect, chatController.accessChat);
router.route('/').get(authController.protect, chatController.fetchChats);
router
  .route('/group')
  .post(authController.protect, chatController.createGroupChat);
router
  .route('/rename')
  .patch(authController.protect, chatController.renameGroup);
router
  .route('/groupremove')
  .patch(authController.protect, chatController.removeFromGroup);
router
  .route('/groupadd')
  .patch(authController.protect, chatController.addToGroup);
router
  .route('/delete-chat/:id')
  .delete(authController.protect, chatController.deleteChat);

router
  .route('/fetch-chat-notifications')
  .get(authController.protect, chatController.fetchChatNotifications);
module.exports = router;
