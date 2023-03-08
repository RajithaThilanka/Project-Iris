import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Login from "../../components/Login/Login";
<<<<<<< HEAD
import SignUp from "../../components/SignUp/SignUp.js";
=======
import SignUp from "../../components/SignUp/Signup";
>>>>>>> a3b814aa0bc09644316878a2129186e02ae93cfd

import "./Auth.css";

function Auth({ action }) {
  const dispatch = useDispatch();
  dispatch({ type: "AUTH_RESET" });

  return <div>{action === "signup" ? <SignUp /> : <Login />}</div>;
}

export default Auth;
