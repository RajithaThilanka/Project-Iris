import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";
import ConfirmMail from "./pages/ConfirmMail/ConfirmMail";
import { createTheme, ThemeProvider } from "@mui/material";
import UserProfile from './pages/UProfile/UserProfile'

import Feed from "./pages/Feed/Feed";
import Welcome from './pages/Home/Welcome';
import VerifyMail from "./pages/VerifyMail/VerifyMail";
import Error from "./pages/Error/Error";
import DateCard from "./components/DateCard/DateCard";
import Request from "./components/Request/Request";
import Chat from "./pages/Chat/Chat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/Admin/AdminPage";
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
      backgroundc:"#b3e5fc",
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
            element={user ? <Feed /> : <Navigate to="/auth" />}
          ></Route>
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
          <Route path="/users/verify/:userId/:token"
            element={<VerifyMail />}
          ></Route>

          <Route path="/chat" element={user ? <Chat /> : <Auth />}></Route>
          <Route path="/admin" element={<AdminPage /> }> </Route>
          <Route path="/me/profile" element={<UserProfile /> }> </Route>
          
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
