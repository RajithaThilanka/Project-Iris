import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Button,
  Container,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import Stack from "@mui/material/Stack";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    setLoading(false);

    if (error) {
      console.error(error);
    } else {
      // Send the payment method to your server for further processing
      console.log(paymentMethod);
    }
  };

  return (
    <div>
      <Stack direction="column" padding={"20px"} spacing={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Checkout Payment
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack direction="column" padding={"20px"} spacing={3}>
            <TextField fullWidth label="Enter email" required />

            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />

            <TextField fullWidth label="Name on Card" required />
            <TextField fullWidth label="Enter NIC" required />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!stripe || loading}
              fullWidth
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Pay"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default CheckoutPage;
