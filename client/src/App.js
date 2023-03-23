import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";
import ConfirmMail from "./pages/ConfirmMail/ConfirmMail";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";

import Welcome from "./pages/Home/Welcome";
import VerifyMail from "./pages/VerifyMail/VerifyMail";
import Error from "./pages/Error/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/UProfile/UserProfile";
import SuggessionPage from "./pages/suggestionProfile/SuggessionPage";

import DateDummy from "./pages/DateDummy";
import AccountInfo from "./components/SignUp/SignUpForms/AccountInfo";
import UserInfo from "./components/SignUp/SignUpForms/UserInfo";
import ProfileView from "./components/SignUp/SignUpForms/ProfileView";
import LookingFor from "./components/SignUp/SignUpForms/LookingFor";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Chat from "./pages/Chat/Chat";
import AboutUs from "./pages/AboutUs/Aboutus";
import Connections from "./pages/Connections/Connections";
import Friends from "./pages/Friends/Friends";
import Dates from "./pages/Dates/Dates";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminPage from "./pages/Admin/AdminPage";
import AdminLogin from "./pages/AdminAuth/AdminLogin";

import Dashboard2 from "./pages/Dashboard/Dashboard2";
import MailConfirmed from "./pages/MailConfirmed/MailConfirmed";
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
      backgroundc: "#b3e5fc",
    },
  },
  breakpoints: {
    values: {
      // xxs: 0,
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  shape: {
    borderRadius: 10,
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
  },

  button: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: "1.3rem",
    lineHeight: 1.75,
    letterSpacing: "0.17em",
    textTransform: "uppercase",
    textAlign: "left",
  },
});

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <ThemeProvider theme={theme}>
      <>
        <Routes>
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
                main="SUCCESS"
                desc=" Please follow the link attached to your email to verify your account"
              />
            }
          ></Route>
          <Route
            path="/reset-message"
            element={
              <ConfirmMail
                main="SUCCESS"
                desc=" Please follow the link attached to your email to reset your password"
              />
            }
          ></Route>
          <Route
            path="/email-confirm/success"
            element={<MailConfirmed main="Email successfully verified" />}
          ></Route>
          <Route
            path="/password-reset/success"
            element={<MailConfirmed main="Password changed successfully" />}
          ></Route>
          <Route
            path="/users/verify/:userId/:token"
            element={<VerifyMail />}
          ></Route>
          {/* <Route path="/me/profile" element={<UserProfile />}></Route> */}
          <Route
            path="/login/admin"
            element={user ? <AdminPage /> : <AdminLogin />}
          />
          <Route
            path="/admin"
            element={user ? <AdminPage /> : <Navigate to="/login/admin" />}
          ></Route>
          <Route
            path="/users/reset-password/:token"
            element={<ResetPassword />}
          ></Route>

          <Route path="/home" element={<Welcome />}></Route>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route
            path="/me/dashboard"
            element={user ? <Dashboard2 /> : <Navigate to="/auth/login" />}
          ></Route>
          <Route
            path="/me/connections"
            element={user ? <Connections /> : <Navigate to="/auth/login" />}
          ></Route>
          <Route
            path="/me/friends"
            element={user ? <Friends /> : <Navigate to="/auth/login" />}
          ></Route>
          <Route path="/me/dates" element={<Dates />}></Route>
          <Route
            path="/me"
            element={
              user ? (
                <Navigate to="/me/dashboard" />
              ) : (
                  <Navigate to="/auth/login" />
                )
            }
          ></Route>
          <Route
            path="/me/chat"
            element={user ? <Chat /> : <Navigate to="/auth/login" />}
          ></Route>
          <Route path="/me/profile" element={<UserProfile />}></Route>
          <Route
            path="/me/suggession/profile"
            element={<SuggessionPage />}
          ></Route>

          <Route path="/video-date/:id" element={<DateDummy />}></Route>
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
