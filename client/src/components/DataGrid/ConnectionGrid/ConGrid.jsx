import React from 'react'
import {Button, Box, Stack, Typography,Paper } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { styled } from "@mui/material/styles";
import { IconButton } from '@mui/material';



export default function ConGrid() {
    return (
        <div>
            <Box borderRadius='1' sx={{justifyContent:"center"}}>
                <Stack direction="raw" spacing={2}>
                                        
                 <IconButton color="primary" aria-label="ProfilePicture" >
                     <AccountCircleIcon />
                 </IconButton>
                <Typography variant="h6">
                      Name:
                </Typography>  
               
                <FiberManualRecordIcon  />

               
               <Button sx={{ fontSiz: "50px" }}>
                      <MessageIcon />
                </Button>

                </Stack>
            </Box>
        </div>
    )
}
