import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Login from "../../components/Login/Login";

import "./Auth.css";

function Auth({ action }) {
  const dispatch = useDispatch();
  dispatch({ type: "AUTH_RESET" });

  return <div>{<Login />}</div>;
}

export default Auth;
