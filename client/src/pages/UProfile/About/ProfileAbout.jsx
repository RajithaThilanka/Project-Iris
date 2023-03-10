import React, { useInsertionEffect } from 'react'
import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';

import {
  Card,
  CardContent,
  Typography,
  Content,
  Button,
  CardActions,
  Stack,
  Paper,
  Box,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import ProComplete from '../../../components/Profile/ProfileComplete/profilecomplete'
import Factfile from '../../../components/Profile/ProfileFactfiles/Factfile';
import { getMe } from "../../../api/UserRequests";
import GppBadIcon from '@mui/icons-material/GppBad';


const ENDPOINT = "http://localhost:5000";



export default function ProfileAbout() {
  const ProfileData = require("../../../components/Profile/profileData.json")

  const [activeStat1, activeState1] = useState(1);
  const [activeStat2, activeState2] = useState(1);
  const [activeStat3, activeState3] = useState(1);
  const [activeStat4, activeState4] = useState(1);
  const [activeStat5, activeState5] = useState(1);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: {
            data: { data },
          },
        } = await getMe();
        setUser(data);
        console.log(data);
        console.log(user.userDescription)
     
      } catch (error) {
        console.log(error)
      }
    };
    getData();
  }, []);
     

    return (
      <div>

    <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
        paddingLeft={10}
        paddingRight={10}
        spacing={2}
      >
        <Grid item xs={8}>
   <Box
         sx={{
             
         width: '100%',
        height: '100%',
        padding:2,
        borderRadius: 0.5,
        boxShadow:2,
        backgroundColor: '#e1f5fe',
        '&:hover': {
          backgroundColor: '#e1f5fe',
        //  opacity: [0.9, 0.8, 0.7],
        },
      }} >
          <Typography>
                About me
         </Typography> 
               <TextField
                id="standard-multiline-static"      
                multiline
                disabled={activeStat2}
                rows={3}
                variant="standard"
                value={user?.userDescription} 
                sx={{width:'100%', border:0 }}  
                />  
                
             <Stack direction="row" spacing={2} justifyContent="right" marginTop={2}>
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />} onClick={() => { activeState2(0) }}  >
                  Edit
                </Button>
                  <Button variant="outlined" endIcon={<SaveIcon />} onClick={() => { activeState2(1) }} >
                 Save
                </Button>
              </Stack>

                                           
            </Box>   
          
        </Grid>


        <Grid item xs={4}>
        <Box
         sx={{
        width: '100%',
        height: '100%',
        padding:2,
        borderRadius: 0.5,
        boxShadow:2,
        backgroundColor: '#e1f5fe',
        '&:hover': {
          backgroundColor: '#e1f5fe',
        //  opacity: [0.9, 0.8, 0.7],
        },
              }} >
              <Stack spacing={2} direction='row'>
                <stack direction='column'>
                <ProComplete /> 
                <Typography>
                  
                  Profile Completetion 
                </Typography>
                
                </stack>

                <stack direction='column' >
                < GppBadIcon />  
                <Typography>
                 Unverified 
                </Typography>
                
                </stack>

           
           
             </Stack>                 
    </Box>
                
        </Grid>

        <Grid item xs={8} alignItems="flex-start" >
                    <Stack spacing={2} direction={'column'} alignItems="flex-start" > 


                    <Box
         sx={{
             
        width: '100%',
        height: '100%',
        padding:2,
        borderRadius: 0.5,
        boxShadow:2,
        backgroundColor: '#e1f5fe',
        '&:hover': {
          backgroundColor: '#e1f5fe',
        //  opacity: [0.9, 0.8, 0.7],
        },
      }} >
         <Typography>
                  Life style <br /> <br/> 
                
         </Typography>
                <Stack spacing={2} direction='column' spacing={2}>
                           <TextField
                id="outlined-multiline-static"
                label="INTERESTS AND HOBBIES"
                    multiline
                    variant="standard"
                    rows={3}
                    value={ProfileData.interests}
                    disabled={activeStat3}
                
                
                    sx={{ width: '100%' }} /> 
                  
                            <Stack direction="row" spacing={2} justifyContent="right" marginTop={2}>
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />} onClick={() => { activeState3(0) }}  >
                  Edit
                </Button>
                  <Button variant="outlined" endIcon={<SaveIcon />} onClick={() => { activeState3(1) }} >
                 Save
                </Button>
              </Stack>   
                  
                             <TextField
                id="outlined-multiline-static"
                label="SPORTS"
                multiline
                    rows={3}
                    variant="standard"
                disabled={activeStat4}
                value={ProfileData.sports}
                    sx={{ width: '100%' }} /> 
                  
                               <Stack direction="row" spacing={2} justifyContent="right" marginTop={2}>
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />} onClick={() => { activeState4(0) }}  >
                  Edit
                </Button>
                  <Button variant="outlined" endIcon={<SaveIcon />} onClick={() => { activeState4(1) }} >
                 Save
                </Button>
              </Stack>
                  
                             <TextField
                id="outlined-multiline-static"
                label="FOOD AND DRINK"
                multiline
                    rows={3}
                    variant="standard"
                defaultValue=" "
                disabled={activeStat5}
                value={ProfileData.sports}
                sx={{width:'100%'}} /> 
                <Stack direction="row" spacing={2} justifyContent="right" marginTop={2}>
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />} onClick={() => { activeState5(0) }}  >
                  Edit
                </Button>
                  <Button variant="outlined" endIcon={<SaveIcon />} onClick={() => { activeState5(1) }} >
                 Save
                </Button>
              </Stack>
                </Stack>
                                           
          </Box> 
    </Stack>                    
                </Grid>
                
                <Grid item xs={4}>
    <Stack spacing={2} direction={'column'} >
     <Factfile />
                        
    </Stack>                    
 </Grid>


  </Grid>
  </div>
   )
}
