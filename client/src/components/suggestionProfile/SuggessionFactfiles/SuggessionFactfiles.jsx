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

export default function SuggessionFactfiles() {
  return (
    <div>
      <Stack direction="column" spacing={2}>
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <PersonIcon /> Name :
          </Typography>
        </Stack>
        <hr />

        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <PersonIcon /> Call Name :
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <CakeIcon /> DOB :
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <WorkIcon /> Occupation :
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
            Body Type :
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <SchoolIcon /> Education Level :
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <LanguageIcon /> Language :
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <WcIcon /> Merital Status :
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <ChildCareIcon /> Has Children :
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="Row"
          spacing={2}
          sx={{ justifyContent: "space-between" }}
        >
          <Typography spacing={2}>
            <TempleBuddhistIcon /> Religion :
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
}
