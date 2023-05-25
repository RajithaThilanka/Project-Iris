import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { getMyVerStatus } from "../../../api/UserRequests";
const ProfileData = require("../../Profile/profileData.json");

function CircularProgressWithLabel(props) {
  const [verStatus, setVerStatus] = useState(false);
  useEffect(() => {
    const getStatus = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMyVerStatus();

        if (data) {
          setVerStatus(data.status);
        } else {
          setVerStatus(false);
        }
        //   setVerStatus()
      } catch (error) {
        console.log(error);
        setVerStatus(false);
      }
    };
    getStatus();
  }, []);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CircularStatic() {
  const [progress, setProgress] = React.useState(
    ProfileData.profileCompletetion
  );

  return <CircularProgressWithLabel value={ProfileData.profileCompletetion} />;
}
