const express = require('express');
const friendsController = require('../controllers/friendsController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router({ mergeParams: true });

router
  .route('/invite/:id')
  .patch(authController.protect, friendsController.inviteFriend);
router
  .route('/accept/:id')
  .patch(authController.protect, friendsController.acceptFriend);
router
  .route('/remove/:id')
  .patch(authController.protect, friendsController.removeFriend);

router
  .route('/cancel/:id')
  .patch(authController.protect, friendsController.cancelFriendInvite);

router
  .route('/received')
  .get(authController.protect, friendsController.getFriendRequestsReceived);

router
  .route('/sent')
  .get(authController.protect, friendsController.getFriendRequestsSent);

router.route('/').get(authController.protect, friendsController.getFriends);

module.exports = router;
