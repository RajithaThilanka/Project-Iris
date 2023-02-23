import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";
<<<<<<< HEAD
import Userfeed from "./pages/UserFeed/Userfeed";
import Profile from './pages/UserProfile/UserProfile';
import ProfileSettings from './pages/UserProfile/ProfileSettings/ProfileSettings'
import ProfileConnection from './pages/UserProfile/ProfileConnection/Profileconnection'
import personalityprofile from './pages/UserProfile/PersonallityProfile/Personalityprofile'
import Personalityprofile from "./pages/UserProfile/PersonallityProfile/Personalityprofile";
import AdminPage from "./pages/Admin/AdminPage";



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

       <Route
          path="/profilesettings"
          element={ <ProfileSettings />}
        />

        <Route
          path="/profileconnection"
          element={ <ProfileConnection/>}
        />

       <Route
          path="/personalityprofile"
          element={ <Personalityprofile />}
        />

       <Route
          path="/admin"
          element={ <AdminPage />}
        />
       
      </Routes>
      
    </div>
=======
import ConfirmMail from "./pages/ConfirmMail/ConfirmMail";
import { createTheme, ThemeProvider } from "@mui/material";

import Feed from "./pages/Feed/Feed";

import VerifyMail from "./pages/VerifyMail/VerifyMail";
import Error from "./pages/Error/Error";
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#c81172",
      dark: "#ba265d",
      light: "#eb2f64",
    },
    secondary: {
      main: "#0fd1fc",
      light: "#52d0f1",
      dark: "#0989a8",
    },
    otherColors: {
      light3: "#f0eeee",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 22,
    fontWeightBold: 500,
    fontWeightLight: 300,
    fontWeightRegular: 400,

    button: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "1.3rem",
      lineHeight: 1.75,
      letterSpacing: "0.17em",
      textTransform: "uppercase",
    },
  },
});
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/me" element={user ? <Feed /> : <Navigate to="/auth" />}>
            <Route path="match" element={<Feed />}></Route>
            <Route path="connections" element={<Feed />}></Route>
          </Route>
          <Route
            path="/"
            element={user ? <Navigate to="/me" /> : <Navigate to="/auth" />}
          ></Route>
          <Route
            path="/auth"
            element={user ? <Navigate to="/me" /> : <Auth />}
          ></Route>
          <Route path="/error/:msg" element={<Error />}></Route>
          <Route path="/confirm-email" element={<ConfirmMail />}></Route>
          <Route
            path="/users/verify/:userId/:token"
            element={<VerifyMail />}
          ></Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </ThemeProvider>
    </>
>>>>>>> f869dd6ba7685cfca5c50b509966910a0f4c7cf6
  );
}

export default App;
