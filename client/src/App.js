import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth/Auth";
import SignUp from "./components/SignUp/SignUp";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div>
      {/* <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        ></Route>
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/home" /> : <Auth />}
        />
      </Routes> */}
      <SignUp />
    </div>
  );
}

export default App;
