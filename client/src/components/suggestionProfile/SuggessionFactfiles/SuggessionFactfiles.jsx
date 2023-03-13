import React from "react";

import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BoyIcon from "@mui/icons-material/Boy";
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import ChurchIcon from "@mui/icons-material/Church";
import { Paper, Stack, Box, IconButton, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import WcIcon from "@mui/icons-material/Wc";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import data from "./Data.json";

export default function SuggessionFactfiles() {
  return (
    <div>
      <Stack direction="column" spacing={2} sx={{ alignItems: "left" }}>
        <Stack
          direction="Row"
          spacing={1}
          // sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <PersonIcon /> Name : {data[0].name}
          </Typography>
        </Stack>
        <hr />

        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <PersonIcon /> Call Name : {data[0].callname}
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <CakeIcon /> DOB :{data[0].dob}
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <WorkIcon /> Occupation :{data[0].occupation}
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <BoyIcon />
            Body Type :{data[0].bodytype}
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <SchoolIcon /> Education Level :{data[0].education}
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <LanguageIcon /> Language :{data[0].language}
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <WcIcon /> Merital Status :{data[0].maritalstatus}
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <ChildCareIcon /> Has Children :{data[0].haschildren}
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <TempleBuddhistIcon /> Religion :{data[0].Religion}
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
}
