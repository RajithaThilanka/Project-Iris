const express = require('express');
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/donate').post(authController.protect, paymentController.pay);

module.exports = router;
