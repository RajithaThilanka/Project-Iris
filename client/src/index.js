import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/ReduxStore";
import App from "./App";
import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },

//   {
//     path: "login",
//     element: <Login />,
//   },

//   {
//     path: "registration",
//     element: <Registration />,
//   },

//   {
//     path: "signup",
//     element: <Signup />,
//   },

//   {
//     path: "lookingfor",
//     element: <Lookingfor />,
//   },
// ]);

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <Routes>
//         <Route path="*" element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
