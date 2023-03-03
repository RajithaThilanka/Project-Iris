import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Login from "../../components/Login/Login";
<<<<<<< HEAD
import SignUp from "../../components/SignUp/SignUp";
=======
import SignUp from "../../components/SignUp/SignUp.js";
>>>>>>> 4345c2f54804f8fea8d41089436c2948f2cf6cc1

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
