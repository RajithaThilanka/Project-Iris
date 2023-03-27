const express = require('express');
const settingsController = require('../controllers/settingsController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/hate-speech')
  .patch(authController.adminProtect, settingsController.scheduleHatespeech);

module.exports = router;
