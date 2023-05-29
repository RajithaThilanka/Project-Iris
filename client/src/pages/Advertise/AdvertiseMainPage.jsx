import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Stack, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DonationPage from "./DonationPage";
import CheckoutPage from "./CheckoutPage";

// import "./verificationStyle.css";

const steps = ["Create Advertisement", "Checkout Payment"];

export default function AdvertiseMainPage(props) {
  const [profile, setProfile] = useState(null);
  const [selectedDocData, setSelectedDocData] = useState(null);
  const [selectedLiveImageData, setselectedLiveImageData] = useState(null);

  const [selectedImageData, setSelectedImageData] = useState({
    newImageName: null,
    newImageName2: null,
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    // Call the API to submit the form data
    if (activeStep === steps.length - 1) {
      try {
        // await requestManualVerify(
        //   selectedDocData,
        //   selectedLiveImageData,
        //   selectedImageData.newImageName,
        //   selectedImageData.newImageName2
        // );
        console.log("Verification sent");
      } catch (error) {
        console.log(error.response.data);
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDocSelected = (method) => {
    setSelectedDocData(method);
    console.log(`Verification method: ${method}`);
  };

  const handleImageSelected = (newImageName, newImageName2) => {
    setSelectedImageData({
      newImageName: newImageName,
      newImageName2: newImageName2,
    });

    console.log(newImageName);
    console.log(newImageName2);
  };

  const handleLiveImageSelected = (liveImageName) => {
    setselectedLiveImageData(liveImageName);
    console.log(`Live Image Name : ${liveImageName}`);
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
        <Grid container item xs={12} sx={{ justifyContent: "center" }}>
          <Box
            // className="stepperHeader"
            sx={{
              width: {
                xl: "900px",
                lg: "900px",
                //md: "650px",
                //sm: "550px",
                // xs: "480px",
              },
              padding: {
                // xl: "10px",
                // lg: "10px",
                //md: "8px",
                //sm: "5px",
                // xs: "5px",
              },
              marginTop: {
                xl: "10px",
                lg: "10px",
                //md: "5px",
                //sm: "1px",
                // xs: "1px",
              },
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
              <React.Fragment></React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 && (
                  <Box
                    className="steppeButton"
                    //button container component
                    sx={{
                      height: {
                        xl: "750px",
                        lg: "500px",
                        //md: "480px",
                        // sm: "440px",
                        // xs: "420px",
                      },
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <Stack
                      direction="column"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      spacing={1}
                    >
                      <DonationPage />
                    </Stack>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box
                    className="steppeButton"
                    sx={{
                      height: {
                        // xl: "500px",
                        //lg: "500px",
                        // md: "480px",
                        //sm: "440px",
                        // xs: "420px",
                      },
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <Stack
                      direction="column"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      spacing={1}
                    >
                      <CheckoutPage />
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
                      className="navButton"
                      sx={{
                        width: {
                          // xl: "100px",
                          // lg: "100px",
                          // md: "100px",
                          //sm: "100px",
                          // xs: "100px",
                        },

                        height: {
                          //xl: "40px",
                          //lg: "40px",
                          //md: "40px",
                          //sm: "40px",
                          // xs: "40px",
                        },
                      }}
                    >
                      Back
                    </Button>

                    <Button
                      className="navButton"
                      sx={{
                        width: {
                          //xl: "100px",
                          //lg: "100px",
                          //md: "100px",
                          //sm: "100px",
                          // xs: "100px",
                        },

                        height: {
                          // xl: "40px",
                          //lg: "40px",
                          // md: "40px",
                          // sm: "40px",
                          // xs: "40px",
                        },
                      }}
                      onClick={handleNext}
                      variant="contained"
                    >
                      {activeStep === steps.length - 1 ? "Close" : "Next"}
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
