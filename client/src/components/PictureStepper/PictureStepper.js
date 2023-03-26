// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";

// // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

// function PictureStepper({ profile }) {
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = profile?.photos?.length;

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };

//   return (
//     <Box className="sugg-card">
//       <SwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//         style={{
//           height: "90%",
//           background: "red",
//           position: "relative",
//           borderTopLeftRadius: "15px",
//           borderTopRightRadius: "15px",
//           //   minHeight: "90%",
//         }}
//       >
//         {!btnClicked ? (
//           <IconButton className="more-info-btn" onClick={handleProfileContent}>
//             <MoreVertIcon fontSize="large" sx={{ color: "#eee" }} />
//           </IconButton>
//         ) : (
//           <IconButton
//             className="more-info-btn"
//             onClick={handleCloseProfileContent}
//           >
//             <CloseIcon fontSize="large" sx={{ color: "#eee" }} />
//           </IconButton>
//         )}
//         {profile?.photos?.map((step, index) => (
//           <div
//             className="yo yo"
//             key={index}
//             style={{
//               height: "100%",
//               background: "blue",
//             }}
//           >
//             {Math.abs(activeStep - index) <= 2 ? (
//               <img
//                 style={{
//                   display: "block",
//                   width: "100%",
//                   height: "100%",
//                 }}
//                 src={serverPublic + step}
//                 alt={step}
//               />
//             ) : null}
//           </div>
//         ))}
//       </SwipeableViews>
//       <MobileStepper
//         steps={maxSteps}
//         position="static"
//         activeStep={activeStep}
//         nextButton={
//           <Button
//             size="small"
//             onClick={handleNext}
//             disabled={activeStep === maxSteps - 1}
//           >
//             Next
//             {theme.direction === "rtl" ? (
//               <KeyboardArrowLeft />
//             ) : (
//               <KeyboardArrowRight />
//             )}
//           </Button>
//         }
//         backButton={
//           <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
//             {theme.direction === "rtl" ? (
//               <KeyboardArrowRight />
//             ) : (
//               <KeyboardArrowLeft />
//             )}
//             Back
//           </Button>
//         }
//       />
//     </Box>
//   );
// }

// export default PictureStepper;

// //  <div
// //                   className="sugg-card"
// //                   style={{
// //                     backgroundImage: `url(${

// //                     })`,
// //                   }}
// //                 >
// //
// //                   <div className="profile--header">
// //                     <IconButton
// //                       style={{
// //                         background: "rgba(0, 0, 0, 0.4)",
// //                         borderRadius: "50%",
// //                         width: "4rem",
// //                         height: "4rem",
// //                         color: "red",
// //                         position: "absolute",
// //                         right: "1rem",
// //                         top: 0,
// //                       }}
// //                       onClick={() =>
// //                         navigate(
// //                           `/users/report/${filtered[currentProfile]._id}`
// //                         )
// //                       }
// //                     >
// //                       <FlagCircle fontSize="large" />
// //                     </IconButton>

// //                     <h6 className="profile--name">
// //                       {filtered[currentProfile]?.callTag}

// //                       {filtered[currentProfile]?.verStatus && (
// //                         <VerifiedIcon
// //                           style={{ fill: "cyan" }}
// //                           fontSize="small"
// //                         />
// //                       )}
// //                     </h6>
// //                     <p className="profile--age">
// //                       {Math.abs(
// //                         new Date(
// //                           Date.now() - Date.parse(filtered[currentProfile]?.dob)
// //                         ).getUTCFullYear() - 1970
// //                       )}
// //                     </p>
// //                     <div className="profile--country">
// //                       {<LocationOnIcon fontSize="small" sx={{ padding: 0 }} />}
// //                       {filtered[currentProfile]?.country}
// //                     </div>
// //                     <div className="suggestion-status-container">
// //                       {activeUsers.some(
// //                         (user) => user.userId === filtered[currentProfile]?._id
// //                       ) ? (
// //                         <div className="suggestion-online--dot"></div>
// //                       ) : (
// //                         <div className="suggestion-offline--dot"></div>
// //                       )}

// //                       <div className="suggestion-status">
// //                         {activeUsers.some(
// //                           (user) =>
// //                             user.userId === filtered[currentProfile]?._id
// //                         )
// //                           ? "Online"
// //                           : "Offline"}
// //                       </div>
// //                     </div>
// //                     <Button
// //                       type="contained"
// //                       onClick={() =>
// //                         handleConRequest(filtered[currentProfile]?._id)
// //                       }
// //                       className="connect-btn-sug"
// //                     >
// //                       Connect
// //                     </Button>
// //                   </div>
// //                 </div> */}
