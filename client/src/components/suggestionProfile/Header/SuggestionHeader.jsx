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
export default function SuggestionHeader(props) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  return (
    <div className="SuggesstionHeader">
      <Box
        sx={{
          width: "100%",
          height: { xl: 300, lg: 300, md: 230, sm: 150, xs: 150 },
        }}
      >
        <Stack
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
          <Box
            sx={{
              boxShadow: 4,
              width: { xl: 250, lg: 250, md: 150, sm: 110, xs: 110 },
              height: { xl: 250, lg: 250, md: 150, sm: 110, xs: 110 },
              borderRadius: 2,
              bgcolor: "gray",
            }}
            component="img"
            height="140"
            src={serverPublic + props.imageid}
            alt="green iguana"
          ></Box>
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
              <Typography variant="h4">Name :</Typography>
              <Typography variant="h5">{props.name}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h4">Occupation :</Typography>
              <Typography variant="h5">{props.occupation}</Typography>
            </Stack>

            <Typography variant="h5">
              {props.Verified ? <VerifiedUserIcon /> : <GppBadIcon />}
            </Typography>
            {/* /me/chat */}
            <Button
              variant="contained"
              onClick={() => navigate("/me/chat")}
              sx={{
                width: "20px",
                height: { xl: 30, lg: 30, md: 30, sm: 30, xs: 25 },
              }}
            >
              <ChatIcon />
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
