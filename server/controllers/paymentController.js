const Stripe = require('stripe');
const TotalPrice = 450.0;
const stripe = Stripe(
  'sk_test_51MzDJEK0p6t6EmIIFxgL5FDXP2TSqAgViTMErv6acGHgClDdbxYRufCcCDNNvEdBUA9GkqzAqiggi4lrhIAZGYsE00jNEp75xF'
);
const catchAsync = require('../utils/catchAsync');

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
