import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";

import "./Auth.css";

function Auth({ action }) {
  const dispatch = useDispatch();
  dispatch({ type: "AUTH_RESET" });

  return <div>{action === "signup" ? <SignUp /> : <Login />}</div>;
}

export default Auth;
