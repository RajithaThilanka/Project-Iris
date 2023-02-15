import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login/login";
import Registration from "./pages/Login/registration";
import Signup from "./pages/SIgnup/signup";
import Lookingfor from "./pages/SIgnup/Lookinfor/lookingfor";
import { Provider } from "react-redux";
import store from "./store/ReduxStore";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "login",
    element: <Login />,
  },

  {
    path: "registration",
    element: <Registration />,
  },

  {
    path: "signup",
    element: <Signup />,
  },

  {
    path: "lookingfor",
    element: <Lookingfor />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
