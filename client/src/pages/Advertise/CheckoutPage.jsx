import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutComp from "../../components/Payment/CheckoutComp";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material"; // Import the missing Box component
import Stack from "@mui/material/Stack";
import Navbar from "../../components/Appbar/Navbar";
export default function CheckoutPage() {
  const stripePromise = loadStripe(
    "pk_test_51NAzG4BmWq0tXqH3JFYSu6xGa1OExnXwTlQ5D93RJdzbGGbEvl966ysE0nHAZgeEhQo1CrHq130GIyR9bZUu64ct00law4bwXf"
  );
  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { id } = useParams();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <Stack className="MainStack" spacing={12} direction="column">
        <Navbar user={user} />
        <Stack
          className="conponenentStack"
          spacing={5}
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Box
            className="containBox"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              boxShadow: 5,
              width: "600px",
              height: "600px",
            }}
          >
            <Elements stripe={stripePromise}>
              <CheckoutComp />
            </Elements>
          </Box>
        </Stack>

        <Stack />
      </Stack>
    </Box>
  );
}
