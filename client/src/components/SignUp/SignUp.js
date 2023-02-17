import "../../App.css";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FormLabel from "@mui/material/FormLabel";

function SignUp() {
  const initialState = {
    firstname: "",
    lastname: "",
    gender: "",
    languages: [],
    lookingFor: {},
    email: "",
    dob: null,
    occupation: "",
    height: "",
    maritalStatus: "",
    educationLevel: "",
    monthlyIncome: "",
    hasChildren: false,
    religion: "",
    ethnicity: "",
    profilePhoto: "",
    password: "",
    passwordConfirm: "",
    userDescription: "",
  };
  return (
    <Grid>
      <Grid
        justifyContent="flex-end"
        display="flex"
        sx={{ mx: 0.5, padding: 1 }}
      >
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Grid>

      <Grid>
        <h1>Register now for free</h1>
      </Grid>

      <Grid>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Email" color="secondary" name="email" />
          <TextField label="Password" color="secondary" name="password" />
          <TextField
            label="Confirm Password"
            color="secondary"
            name="passwordConfirm"
          />
        </Box>
      </Grid>

      <Grid sx={{ padding: 2 }}>
        <Button
          variant="contained"
          disableElevation
          sx={{ backgroundColor: "#ED1E82" }}
          style={{ padding: "11px 140px", borderRadius: "50px" }}
        >
          Register Now
        </Button>
      </Grid>
    </Grid>
  );
}

export default SignUp;
