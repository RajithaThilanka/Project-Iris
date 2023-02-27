import React from 'react'
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";


export default function SIdeBar() {
    return (
        <div>
    <Stack direction="row" spacing={2}>
     <Paper sx={{width:'150px', height: '700px',backgroundColor:"#1e1e1e",color:'white' }}>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper>
    </Stack>
        </div>
    )
}
