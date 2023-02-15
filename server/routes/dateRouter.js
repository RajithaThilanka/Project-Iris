const express = require('express');
const datesController = require('../controllers/datesController');
const authController = require('../controllers/authController');
const friendsController = require('../controllers/friendsController');

const router = express.Router({ mergeParams: true });

router
  .route('/invite/:id')
  .post(
    authController.protect,
    authController.checkManualVerification,
    friendsController.checkFriend,
    datesController.inviteDate
  );
router
  .route('/accept/:id')
  .patch(
    authController.protect,
    authController.checkManualVerification,
    friendsController.checkFriend,
    datesController.acceptDate
  );

router
  .route('/sent')
  .get(
    authController.protect,
    authController.checkManualVerification,
    datesController.getAllSentDates
  );
router
  .route('/received')
  .get(
    authController.protect,
    authController.checkManualVerification,
    datesController.getAllReceivedDates
  );
router
  .route('/cancel/:id')
  .delete(
    authController.protect,
    authController.checkManualVerification,
    datesController.cancelDateInvite
  );
router
  .route('/postpone/:id')
  .patch(
    authController.protect,
    authController.checkManualVerification,
    datesController.postponeDate
  );
router
  .route('/remove/:id')
  .delete(
    authController.protect,
    authController.checkManualVerification,
    datesController.removeDate
  );
router
  .route('/')
  .get(
    authController.protect,
    authController.checkManualVerification,
    datesController.getAllScheduledDates
  );
module.exports = router;
