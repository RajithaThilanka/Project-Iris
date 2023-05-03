const express = require('express');
const paymentController = require('../controllers/paymentController.js');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/payment')
  .post(paymentController.pay);

// const PaymentRoute = express.Router();

// PaymentRoute.route('/Payment').post(pay);

// export default PaymentRoute;
module.exports = router;