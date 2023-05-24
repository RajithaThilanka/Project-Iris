const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .post(authController.protect, reviewController.addReview)
  .get(reviewController.getReviews);

// router
//   .route('/review-report')
//   .patch(authController.adminProtect, reportController.reviewReport);

// router
//   .route('/fetch-warnings')
//   .get(authController.protect, reportController.fetchWarnings);

// router
//   .route('/get-to-delete-accounts')
//   .get(authController.adminProtect, reportController.getToBeBlockedAccounts);

// router
//   .route('/notified')
//   .patch(authController.protect, reportController.setNotified);
module.exports = router;
