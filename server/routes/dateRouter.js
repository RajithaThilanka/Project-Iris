const express = require('express');
const datesController = require('../controllers/datesController');
const authController = require('../controllers/authController');
const friendsController = require('../controllers/friendsController');

const router = express.Router({ mergeParams: true });

router
  .route('/invite/:id')
  .post(
    authController.protect,
    friendsController.checkFriend,
    datesController.inviteDate
  );
router
  .route('/accept/:id')
  .patch(
    authController.protect,
    friendsController.checkFriend,
    datesController.acceptDate
  );

router
  .route('/sent')
  .get(authController.protect, datesController.getAllSentDates);
router
  .route('/received')
  .get(authController.protect, datesController.getAllReceivedDates);
router
  .route('/cancel/:id')
  .get(authController.protect, datesController.cancelDateInvite);
router
  .route('/postpone/:id')
  .patch(authController.protect, datesController.postponeDate);
router
  .route('/remove/:id')
  .delete(authController.protect, datesController.removeDate);
router
  .route('/')
  .get(authController.protect, datesController.getAllScheduledDates);
module.exports = router;
