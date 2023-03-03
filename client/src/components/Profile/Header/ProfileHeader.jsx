import React from "react";
import { Grid,Paper, Typography,Stack,Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';


function ProfilHeader() {
  return <div>
    
    <Paper elevation={1}  sx={{   
      display: 'flex',
      height: 300,
      padding: '1'

    }} >

    
    <Grid container justifyContent="center" marginTop={6} >
      <Grid item>  
       
       <Stack direction='column' justifyContent="center" >  
        <Tooltip title="Profile" placement="bottom" size='large' >
          <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 150, height: 150 }}
          />
              
         </Tooltip>
          <br />

         <Button component="label">
             Upload Profile Picture 
              <input hidden accept="image/*"  multiple type="file" />
          </Button>  
         </Stack>
            
         </Grid>
        <Grid item marginTop={21} justifyContent='right'> 
          <Button component="label" justifyContent="right" >
              Update cover picture 
             <input hidden accept="image/*"  multiple type="file" />
         </Button>  
        </Grid>
      
      </Grid>

    </Paper>
    
    </div>;
}

export default ProfilHeader;
