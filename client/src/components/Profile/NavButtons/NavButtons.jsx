import React from 'react';
import Stack from '@mui/material/Stack';
import {Box , Grid,Divider,Typography,Button } from '@mui/material'

function NavButtons() {
  return (
    <div>
         <Stack 
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        justifyContent={"center"}
        marginTop={2}
       >
              <Button variant="text">About</Button>
              <Button variant="text">Connections</Button>
              <Button variant="text">Personallity profile</Button>
              <Button variant="text">Settings</Button>
          </Stack> 
      
    </div>
  )
}

export default NavButtons
