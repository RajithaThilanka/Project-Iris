import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Button,
  Container,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Payment } from "../../api/UserRequests";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [TotalPrice, setTotalPrice] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const data = await Payment(50 * 100);
      setClientSecret(data.data.clientSecret);
    };

    fetchClientSecret();
    console.log("clientSecret is >>>>", clientSecret);
  }, []);

  const handleConfirmPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.log(error);
        setErrorMessage("Error processing payment.");
      } else {
        setTimeout(() => {
          navigate("/advertise/Paymentsuccess");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error processing payment.");
    }
  };

  return (
    <div>
      <Stack direction="column" padding={"20px"} spacing={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Checkout Payment
        </Typography>

        <form onSubmit={handleConfirmPayment}>
          <Stack direction="column" padding={"20px"} spacing={3}>
            {/* <Typography variant="body1">Total payment Is: ${amount}</Typography> */}
            <Typography variant="body1">Total payment Is: 10$</Typography>
            <TextField fullWidth label="Enter email" required />

            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
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
            </div>

            <TextField fullWidth label="Name on Card" required />

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
