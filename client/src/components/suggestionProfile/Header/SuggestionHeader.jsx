import React from "react";
import { Box, Stack, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import "./SuggesstionHeaderStyle.css";

export default function SuggestionHeader() {
  return (
    <div className="SuggesstionHeader">
      <Box
        sx={{
          width: "100%",
          height: "300px",
        }}
      >
        <Stack
          sx={{
            padding: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
          direction="row"
          spacing={3}
        >
          <Box
            sx={{
              boxShadow: 4,
              width: "300px",
              height: "250px",
              borderRadius: 2,
              bgcolor: "gray",
            }}
            component="img"
            height="140"
            src="https://images.unsplash.com/photo-1677484179240-ff398b0a2d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="green iguana"
          ></Box>
          <Stack
            direction="column"
            sx={{
              padding: "20px",
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <Typography variant="h4">Name :</Typography>
            <Typography variant="h5">Occupation :</Typography>
            <Button variant="contained">
              <ChatIcon />
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
