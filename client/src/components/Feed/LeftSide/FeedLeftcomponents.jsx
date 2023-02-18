
import React from "react";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import FR  from '../../../components/DataGrid/ConnectionGrid/ConGrid'

import { IconButton, Typography } from '@mui/material';
import { useRef, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation } from "swiper";
import { Grid, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";


export default function FeedLeftcomponents() {
    return (
        <div>
    <Paper variant="outlined" sx={{width:'auto',height: '50%' }}>
        <Box
          sx={{
            width: 'auto',
            height:'50',
            boxShadow: 2,

            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 1,
            m: 1,
            borderRadius: 0,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700"
          }}
               >
                    <Stack direction='column'>
                        <Typography varient="h6"> Friend Requists </Typography>
                     <FR />
                 </Stack>

        </Box>
        <Box
          sx={{
            boxShadow: 2,
            width: 'auto',
            height:'50',

            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 1,
            m: 1,
            borderRadius: 0,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700"
            
          }}
        >
                <Stack direction='column'>
                    Connection Requists
                </Stack>
        </Box>
      </Paper>
      <Paper variant="outlined" sx={{width:'auto' ,height: '50%'  }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 'auto',
            height:'50',

            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            p: 1,
            m: 1,
            borderRadius: 0,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700"
            
          }}
        >
                <Stack direction='column'>
                    FRIENDS
                </Stack>
        </Box>
      </Paper>
        </div>
    )
}
