const stripe = require('stripe')(
  'sk_test_51N3gxUSFB1LW96dhmYtkWan6Y8V5MrHiNo73kwLrqNocrKRxvVmQ6K1BcYpxQAHWiDgWXckqM08b1nQoSH88iKBb00cNmyna9s'
);
require('dotenv').config();
const catchAsync = require('../utils/catchAsync');

exports.pay = catchAsync(async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel',
  });

  res.redirect(303, session.url);
});
