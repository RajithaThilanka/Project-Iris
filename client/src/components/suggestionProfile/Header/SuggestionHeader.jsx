import React from "react";
import { Box, Stack, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import "./SuggesstionHeaderStyle.css";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Typography, makeStyles } from "@mui/material";
import { createStyles } from "@mui/styles";
import GppBadIcon from "@mui/icons-material/GppBad";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import IconButton from "@mui/material/IconButton";

export default function SuggestionHeader(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  return (
    <div className="SuggesstionHeader">
      <Box className="Mainheader">
        <Stack
          className="componentStack"
          sx={{
            padding: {
              xl: "20px",
              lg: "20px",
              md: "20px",
              sm: "10px",
              xs: "10px",
            },
            alignItems: "center",
            justifyContent: "center",
          }}
          direction={{
            lg: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "row",
          }}
          spacing={3}
        >
          {/* <Box
            className="ProfileAvatar"
            sx={{
              boxShadow: 4,
              //width: { xl: 250, lg: 250, md: 150, sm: 110, xs: 110 },
              //height: { xl: 250, lg: 250, md: 150, sm: 110, xs: 110 },
              borderRadius: 2,
              bgcolor: "gray",
            }}
            component="img"
            height="140"
            src={serverPublic + props.imageid}
            alt="green iguana"
          ></Box> */}
          <div style={{ position: "relative", backgroundColor: "none" }}>
            <Avatar
              className="profileavatar custom-avatar"
              style={{
                border: "4px solid white",
                margin: "1px",
              }}
              alt="The image"
              src={serverPublic + props.imageid}
              sx={{
                width: { xs: 64, sm: 96, md: 128, lg: 150 },
                height: { xs: 64, sm: 96, md: 128, lg: 150 },
              }}
            />

            {/* <label htmlFor="file-upload">
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 27,
                  height: 27,
                  border: "4px solid #fff",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              ></Avatar>
            </label> */}
          </div>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={0}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography className="Name">Name :</Typography>
              <Typography className="NameContent">{props.name}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography className="Occupation">Occupation :</Typography>
              <Typography className="OccupationContent">
                {props.occupation}
              </Typography>
            </Stack>

            <Typography className="OccupationContent">
              {props.Verified ? <VerifiedUserIcon /> : <GppBadIcon />}
            </Typography>
            {/* /me/chat */}
            {/* <Button
              variant="contained"
              onClick={() => navigate("/me/chat")}
              sx={{
                width: "20px",
                height: { xl: 30, lg: 30, md: 30, sm: 30, xs: 25 },
              }}
            >
              <ChatIcon />
            </Button> */}
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
