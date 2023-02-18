import React from 'react'
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import { Grid, Box } from "@mui/material";

import { IconButton, Typography } from '@mui/material';
import { useRef, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function FeedHeader() {
    return (
        <div>
               <Box className="feedheader" >       
               <Button sx={{ fontSiz: "50px" }}>
                 <Typography variant="h3">
                   IRIS
                  </Typography>
             </Button>

          <Tooltip title="View Profile" placement="right">
               <IconButton color="primary" aria-label="ProfilePicture" size="large">
                     <AccountCircleIcon />
               </IconButton>  
          </Tooltip>
   </Box>
            
        </div>
    )
}
