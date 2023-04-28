const express = require('express');
const pay = require('../controllers/paymentController.js');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/payment')
  .post(pay);

// const PaymentRoute = express.Router();

// PaymentRoute.route('/Payment').post(pay);

// export default PaymentRoute;
module.exports = router;