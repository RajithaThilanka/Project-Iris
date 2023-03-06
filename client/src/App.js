import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";
import ConfirmMail from "./pages/ConfirmMail/ConfirmMail";
import { createTheme, ThemeProvider } from "@mui/material";

import Feed from "./pages/Feed/Feed";
import Welcome from "./pages/Home/Welcome";
import VerifyMail from "./pages/VerifyMail/VerifyMail";
import Error from "./pages/Error/Error";
import DateCard from "./components/DateCard/DateCard";
import Request from "./components/Request/Request";
// import UserChat from "./pages/UserChat/UserChat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateVideo from "./pages/DateVideo/DateVideo";

import DateDummy from "./pages/DateDummy";
import AccountInfo from "./components/SignUp/SignUpForms/AccountInfo";
import UserInfo from "./components/SignUp/SignUpForms/UserInfo";
import ProfileView from "./components/SignUp/SignUpForms/ProfileView";
import LookingFor from "./components/SignUp/SignUpForms/LookingFor";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Profile from "./Profile/Profile";
import Chat from "./pages/Chat/Chat";
import AboutUs from "./pages/AboutUs/Aboutus";
// import DateBox from "./pages/Date/DateBox";
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
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#662E9B",
      },
    },
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
    <ThemeProvider theme={theme}>
      <>
        <Routes>
          <Route
            path="/me"
            element={user ? <Feed /> : <Navigate to="/auth/login" />}
          ></Route>

          <Route
            path="/auth/signup/account-info"
            element={<AccountInfo />}
          ></Route>
          <Route
            path="/auth/signup/user-info/:id"
            element={<UserInfo />}
          ></Route>
          <Route
            path="/auth/signup/profileview-info/:id"
            element={<ProfileView />}
          ></Route>
          <Route
            path="/auth/signup/lookingfor-info/:id"
            element={<LookingFor />}
          ></Route>
          <Route
            path="/auth/login"
            element={user ? <Navigate to="/me" /> : <Auth action="login" />}
          ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/error/:msg" element={<Error />}></Route>
          <Route
            path="/confirm-email"
            element={
              <ConfirmMail
                main="Mail successfully sent"
                desc=" Please follow the link attached to your email to verify your account"
              />
            }
          ></Route>
          <Route
            path="/reset-message"
            element={
              <ConfirmMail
                main="Mail successfully sent"
                desc=" Please follow the link attached to your email to reset your password"
              />
            }
          ></Route>
          <Route
            path="/users/verify/:userId/:token"
            element={<VerifyMail />}
          ></Route>
          <Route
            path="/users/reset-password/:token"
            element={<ResetPassword />}
          ></Route>

          <Route path="/home" element={<Welcome />}></Route>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/video-date/:id" element={<DateDummy />}></Route>
          <Route path="/chat" element={<Chat />}></Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        {/* <Chat /> */}

        <ToastContainer
          style={{
            fontSize: "1.3rem",
            fontFamily: "Poppins, sans-serif",
          }}
        />
      </>
    </ThemeProvider>
  );
}

export default App;
