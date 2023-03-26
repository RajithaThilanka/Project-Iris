import React from "react";
import GroupsIcon from '@mui/icons-material/Groups';
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
import HeightIcon from '@mui/icons-material/Height';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export default function SuggessionFactfiles(props) {
  return (
    <div>
      <Stack direction="column" spacing={1}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={2}>
            <PersonIcon /> Call Name :
          </Typography>
          <Typography align="left" >
            <b>{props.callName}</b>
          </Typography>
        </Stack>
        <hr />

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={1}>
            <GroupsIcon /> Ethnicity:
          </Typography>
          <Typography align="left" >
            <b>{props.Ethnicity}</b>
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={1}>
            <CakeIcon /> DOB :
          </Typography>
          <Typography align="left">
            <b>{props.Dob}</b>
          </Typography>
        </Stack>
        <hr />

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={1}>
            <HeightIcon />
            Height :
          </Typography>
          <Typography align="left" >
            <b>{props.Height}</b>
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={1}>
            <SchoolIcon /> Education Level :
          </Typography>
          <Typography align="left" >
            <b>{props.Education}</b>
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={1}>
            <LanguageIcon /> Language :
          </Typography>
          <Typography align="left">
            <b>{props.Language}</b>
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={2}>
            <AttachMoneyIcon /> Monthly Incone :
          </Typography>
          <Typography align="left" >
            <b>{props.Income}</b>
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={1}>
            <ChildCareIcon /> Has Children :
          </Typography>
          <Typography align="left">
            <b>{props.Haschildren ? 'Yes' : 'No'}</b>
          </Typography>
        </Stack>
        <hr />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography spacing={2}>
            <TempleBuddhistIcon /> Religion :
          </Typography>
          <Typography align="left" >
            <b>{props.Religion}</b>
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
}
