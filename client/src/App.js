import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth/Auth";
import SignUp from "./components/SignUp/Signup";
import { createTheme, ThemeProvider } from "@mui/material";

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
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />} />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="/home" /> : <Auth />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
