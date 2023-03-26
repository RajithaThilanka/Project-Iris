import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Login from "../../components/Login/Login";
<<<<<<< HEAD
import SignUp from "../../components/SignUp/SignUp";
=======
>>>>>>> 7351ca6fc62ff501fd951da658e27209538b0b92

import "./Auth.css";

function Auth({ action }) {
  const dispatch = useDispatch();
  dispatch({ type: "AUTH_RESET" });

  return <div>{<Login />}</div>;
}

export default Auth;
