const express = require('express');
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/create-checkout-session').post(paymentController.pay);

module.exports = router;
