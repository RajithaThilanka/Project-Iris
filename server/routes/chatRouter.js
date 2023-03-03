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

module.exports = router;
