import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth/Auth";
import Userfeed from "./pages/UserFeed/Userfeed";
import Profile from './pages/UserProfile/UserProfile';
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        ></Route>
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/home" /> : <Auth />}
        />
        
        <Route
          path="/feed"
          element={ < Userfeed/>}
        />
     
        <Route
          path="/profile"
          element={ <Profile />}
        />
      </Routes>
      

    </div>
  );
}

export default App;
