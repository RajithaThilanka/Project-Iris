const express = require('express');
const connectionsController = require('../controllers/connectionsController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/invite/:id')
  .post(
    authController.protect,
    authController.checkBlocked,
    connectionsController.inviteConnection
  );
router
  .route('/accept/:id')
  .patch(authController.protect, connectionsController.acceptConnection);
router.route('/remove/:id').patch(
  authController.protect,
  // authController.checkManualVerification,
  connectionsController.removeConnection
);

router.route('/cancel-request/:id').delete(
  authController.protect,
  // authController.checkManualVerification,
  connectionsController.cancelConnectionInvite
);
router.route('/received').get(
  authController.protect,
  // authController.checkManualVerification,
  connectionsController.getConnectionRequestsReceived
);
router.route('/sent').get(
  authController.protect,
  // authController.checkManualVerification,
  connectionsController.getConnectionRequestsSent
);

router.route('/').get(
  authController.protect,
  // authController.checkManualVerification,
  connectionsController.getConnections
);

module.exports = router;
