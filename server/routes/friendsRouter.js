const express = require('express');
const friendsController = require('../controllers/friendsController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/invite/:id')
  .patch(
    authController.protect,
    authController.checkManualVerification,
    friendsController.inviteFriend
  );
router
  .route('/accept/:id')
  .patch(
    authController.protect,
    authController.checkManualVerification,
    friendsController.acceptFriend
  );
router
  .route('/remove/:id')
  .patch(
    authController.protect,
    authController.checkManualVerification,
    friendsController.removeFriend
  );

router
  .route('/cancel/:id')
  .patch(
    authController.protect,
    authController.checkManualVerification,
    friendsController.cancelFriendInvite
  );

router
  .route('/received')
  .get(
    authController.protect,
    authController.checkManualVerification,
    friendsController.getFriendRequestsReceived
  );

router
  .route('/sent')
  .get(
    authController.protect,
    authController.checkManualVerification,
    friendsController.getFriendRequestsSent
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.checkManualVerification,
    friendsController.getFriends
  );

module.exports = router;
