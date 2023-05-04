const Stripe = require('stripe');
const TotalPrice = 450.0;
const stripe = require('stripe')(
  'sk_test_51N3gxUSFB1LW96dhmYtkWan6Y8V5MrHiNo73kwLrqNocrKRxvVmQ6K1BcYpxQAHWiDgWXckqM08b1nQoSH88iKBb00cNmyna9s'
);
const catchAsync = require('../utils/catchAsync');
const YOUR_DOMAIN = 'http://localhost:4242';

exports.pay = catchAsync(async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});
