const express = require('express');
const connectionsController = require('../controllers/connectionsController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router({ mergeParams: true });

router
  .route('/invite/:id')
  .post(authController.protect, connectionsController.inviteConnection);
router
  .route('/accept/:id')
  .patch(authController.protect, connectionsController.acceptConnection);
router
  .route('/remove/:id')
  .patch(authController.protect, connectionsController.removeConnection);

router
  .route('/cancel-request/:id')
  .delete(authController.protect, connectionsController.cancelConnectionInvite);
router
  .route('/received')
  .get(
    authController.protect,
    connectionsController.getConnectionRequestsReceived
  );
router
  .route('/sent')
  .get(authController.protect, connectionsController.getConnectionRequestsSent);

router
  .route('/')
  .get(authController.protect, connectionsController.getConnections);

module.exports = router;
