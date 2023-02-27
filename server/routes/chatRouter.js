const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.route('/').post(chatController.createChat);
router.route('/:userId').get(chatController.userChats);
router.route('/find/:firstId/:secondId').get(chatController.findChat);
module.exports = router;
