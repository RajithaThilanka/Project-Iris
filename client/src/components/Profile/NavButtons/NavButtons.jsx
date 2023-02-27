import React from 'react';
import Stack from '@mui/material/Stack';
import { Box, Grid, Divider, Typography, Button } from '@mui/material'
import { Routes, Route, Navigate,useNavigate } from "react-router-dom";
import Prosettings from '../../../pages/UserProfile/ProfileSettings/ProfileSettings'



function NavButtons() {
  const navigate = useNavigate();
  

  return (
    <div>
         <Stack 
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent={"center"}
        marginTop={2}
      >
    
              <Button variant="text" onClick={() => { navigate("/profile")}} >About</Button>
              <Button variant="text" onClick={() => { navigate("/profileconnection")}}  >Connections</Button>
              <Button variant="text" onClick={() => { navigate("/personalityprofile")}}>Personallity profile</Button>
              <Button variant="text" onClick={() => { navigate("/profilesettings")}}>Settings</Button>
        
      </Stack> 
      
    </div>
  )
}

export default NavButtons
