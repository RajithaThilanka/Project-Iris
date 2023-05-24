const stripe = require('stripe')(
  'sk_test_51NAzG4BmWq0tXqH3btKY0BYANRp5AadzYnF0DPtO6suuGV3UU5kJieyvFEwlmiaR8aJSuVibNJSOFXlc8pClnNYP00wsyYL5GF'
);
require('dotenv').config();
const catchAsync = require('../utils/catchAsync');

exports.pay = catchAsync(async (req, res) => {
  const { amount } = req.body;
  const payment = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});
