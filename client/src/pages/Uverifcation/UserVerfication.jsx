import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Stack, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Appbar/Navbar";
import { useEffect } from "react";
import { getUser } from "../../components/api/UserRequests";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectDoc from "../../components/UserVerification/SelectDocument/SelectDoc";
import SelectID from "../../components/UserVerification/IdentityVerifcation/SelectID";
import LiveSelfy from "../../components/UserVerification/FacialVerification/LiveSelfy";

const steps = [
  "Required Documents",
  "Identity Verification",
  "Facial Recognition",
];

export default function UserVerfication() {
  const [profile, setProfile] = useState(null);

  const {
    data: { user },
  } = useSelector((state) => state.authReducer.authData);
  const { id } = useParams();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={10}
      >
        <Grid container item xs={12}>
          <Navbar user={user} />
        </Grid>
        <Grid container item xs={12} sx={{ justifyContent: "center" }}>
          <Box
            sx={{
              width: "1000px",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length ? (
              ///submit button call
              <React.Fragment>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Under Review
                  </Typography>

                  <Typography>
                    You will receive an email once review is completed
                  </Typography>
                </Stack>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 && (
                  <Box
                    sx={{
                      height: "500px",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Stack
                      direction="column"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      spacing={2}
                    >
                      <Typography variant="h5">
                        Use a government-issued document
                      </Typography>
                      <Box
                        sx={{
                          boxShadow: "4",
                          width: "800px",
                          height: "450px",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SelectDoc />
                      </Box>
                    </Stack>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box
                    sx={{
                      height: "500px",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Stack
                      direction="column"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      spacing={2}
                    >
                      <Typography variant="h5">
                        Identity Verification
                      </Typography>
                      <Box
                        sx={{
                          boxShadow: "4",
                          width: "800px",
                          height: "450px",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SelectID />
                      </Box>
                    </Stack>
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box
                    sx={{
                      height: "500px",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <Stack
                      direction="column"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      spacing={2}
                    >
                      <Typography variant="h5">
                        Identity Verification
                      </Typography>
                      <Box
                        sx={{
                          boxShadow: "4",
                          width: "800px",
                          height: "450px",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LiveSelfy />
                      </Box>
                    </Stack>
                  </Box>
                )}
                <Box
                  sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                  >
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      variant="contained"
                      sx={{ width: "110px", height: "45px" }}
                    >
                      Back
                    </Button>

                    <Button
                      sx={{ width: "110px", height: "45px" }}
                      onClick={handleNext}
                      variant="contained"
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </Stack>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
