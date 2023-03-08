import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp.js";

import "./Auth.css";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsSignUp(!isSignUp);
    dispatch({ type: "AUTH_RESET" });
  };

  return <div>{isSignUp ? <SignUp /> : <Login />}</div>;
}

export default Auth;
