import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import UserInfo from "./SignUpForms/UserInfo";
import AccountInfo from "./SignUpForms/AccountInfo";
import LookingFor from "./SignUpForms/LookingFor";
import { useNavigate } from "react-router-dom";
import ProfileView from "./SignUpForms/ProfileView";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/AuthActions";
const steps = [
  "Getting Started",
  "User Info",
  "Let's make your profile glowing",
  "Your Ideal Partner",
];

export default function HorizontalNonLinearStepper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [confirmPass, setConfirmPass] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    country: "",
    dob: "",
    languages: [],
    occupation: "",
    educationLevel: "",
    monthlyIncome: "",
    hasChildren: false,
    religion: "",
    ethnicity: "",
    ft: 0,
    in: 0,
    profilePhoto: "",
    userDescription: "",
    lookingForGender: "",
    minAge: 18,
    maxAge: 0,
    minHeight: 0,
    maxHeight: 0,
  });

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    handleNext();
    if (allStepsCompleted()) {
      if (data.password === data.passwordConfirm) {
        setData({ ...data, height: data.ft + data.in * 0.0833333 });
        setData({ ...data, lookingFor: {} });
        dispatch(signUp(data, navigate));
      } else {
        setConfirmPass(false);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "auto",
        marginTop: "3rem",
        padding: "3rem 1rem",
      }}
    >
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 ? (
        <AccountInfo setData={(d) => setData({ ...data, ...d })} data={data} />
      ) : activeStep === 1 ? (
        <UserInfo setData={(d) => setData({ ...data, ...d })} data={data} />
      ) : activeStep === 2 ? (
        <ProfileView setData={(d) => setData({ ...data, ...d })} data={data} />
      ) : (
        <LookingFor setData={(d) => setData({ ...data, ...d })} data={data} />
      )}
      <div>
        {allStepsCompleted() ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete} variant="contained">
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
