import "./Signup.css";

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
    // <Grid>
    //   <Grid
    //     justifyContent="flex-end"
    //     display="flex"
    //     sx={{ mx: 0.5, padding: 1 }}
    //   >
    //     <IconButton>
    //       <CloseIcon />
    //     </IconButton>
    //   </Grid>

    //   <Grid>
    //     <h1>Register now for free</h1>
    //   </Grid>

    //   <Grid>
    //     <Box
    //       component="form"
    //       sx={{
    //         "& > :not(style)": { m: 1, width: "45ch" },
    //       }}
    //       noValidate
    //       autoComplete="off"
    //     >
    //       <TextField label="Email" color="secondary" name="email" />
    //       <TextField label="Password" color="secondary" name="password" />
    //       <TextField
    //         label="Confirm Password"
    //         color="secondary"
    //         name="passwordConfirm"
    //       />
    //     </Box>
    //   </Grid>

    //   <Grid sx={{ padding: 2 }}>
    //     <Button
    //       variant="contained"
    //       disableElevation
    //       sx={{ backgroundColor: "#ED1E82" }}
    //       style={{ padding: "11px 140px", borderRadius: "50px" }}
    //     >
    //       Register Now
    //     </Button>
    //   </Grid>
    // </Grid>

    <div className="signup">
      <div class="u-margin-bottom-medium">
        <h2 class="heading-secondary">Tell us about yourself</h2>
      </div>
      <form action="" className="form">
        <div className="form__group">
          <label for="firstname" class="form__label">
            First Name
          </label>
          <input
            type="text"
            class="form__input"
            placeholder="First name"
            id="firstname"
            name="firstname"
            required
          />
        </div>

        <div className="form__group">
          <label for="lastname" class="form__label">
            Last Name
          </label>
          <input
            type="text"
            class="form__input"
            placeholder="Last name"
            id="lastname"
            name="lastname"
            required
          />
        </div>
        <div className="form__group">
          <label for="dob" class="form__label">
            Date of Birth
          </label>
          <input type="date" class="form__input" id="dob" name="dob" required />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
