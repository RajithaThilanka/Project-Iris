import React from 'react'
import { Divider,Card,Box, Grid, Stack, Typography, Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


export default function ProfileSettings() {
    return (
        <div>
      
      <Stack
        
         direction="row"
         divider={<Divider orientation="vertical" flexItem />}
         spacing={2}
         justifyContent={ "center" }
         marginTop={5}>
            
           <Box marginBottom='10'  sx={{
                      backgroundColor: 'white',
                      color:'black',
                      height:'300px',
                      width:'900px',
                      borderRadius: '5px',
                      padding: '16px',
                      alignItems: 'center',
                      boxShadow: 2,  
                      
                }}>
     <Accordion>
        <AccordionSummary
          expandIcon={<EditIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" spacing={2}>
            <LockIcon />
            <Typography> Password</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Change Password</Typography>
        </AccordionDetails>
                </Accordion>
                
              <Accordion>
        <AccordionSummary
          expandIcon={<EditIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" spacing={2}>
            <VisibilityIcon />   
            <Typography> Password</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Show me</Typography>
        </AccordionDetails>
      </Accordion>     
  
      </Box>
                       
      </Stack>  
     </div>
    )
}
