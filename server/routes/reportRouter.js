const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const aiController = require('../controllers/aiController');
const connectionsRouter = require('./connectionsRouter');
const friendsRouter = require('./friendsRouter');
const dateRouter = require('./dateRouter');
const reportController = require('../controllers/reportController');
const router = express.Router();

router
  .route('/:id')
  .get(authController.protect, reportController.getReport)
  .post(authController.protect, reportController.reportUser)
  .patch(authController.protect, reportController.reviewReport);

router.route('/').get(authController.protect, reportController.getReports);
module.exports = router;
