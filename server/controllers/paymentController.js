import Stripe from "stripe";
const TotalPrice = 450.00
const stripe = Stripe('sk_test_51MzDJEK0p6t6EmIIFxgL5FDXP2TSqAgViTMErv6acGHgClDdbxYRufCcCDNNvEdBUA9GkqzAqiggi4lrhIAZGYsE00jNEp75xF');
export const pay = async (req, res) => {
    const TotalPrice = req.body.amount * 100;
    const Email = req.body.receipt_email;
    console.log(TotalPrice);
    console.log("Payment Request recieved for this ruppess", TotalPrice);
  
    const payment = await stripe.paymentIntents.create({
      amount: TotalPrice,
      currency: "lkr",
      receipt_email:Email,
    });
  
    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  }