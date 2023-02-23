import React from 'react'
import Bar from '../../../components/Appbar/MainAppbar';
import ProfilHeader from '../../../components/Profile/Header/ProfileHeader';
import Buttonbar from '../../../components/Profile/NavButtons/NavButtons'
import { Grid,Paper, Typography,Stack,Button } from "@mui/material";
import Pro1 from '../../../components/Feed/ProfileCard/ProfileCard'

export default function Profileconnection() {
    return (
        <div>
                <Bar />
                <ProfilHeader />
                <Buttonbar />
            <Grid container  justifyContent={'center'} spacing={2} margin={3}>
                  <Grid item xs={4}>
                     < Pro1 sx={{ width: 300, height: "50" }} />
                  </Grid>
                
                  <Grid item item xs={4}>
                    Connection 2    
                  </Grid>
                
                  <Grid item item xs={4}>
                      Connection 3   
                  </Grid>
                
                  <Grid item item xs={4}>
                      Connection 4 
                  </Grid>
                  
                  <Grid item item xs={4}>
                      Connection 5
                  </Grid>
                
                  <Grid item>
                      Connection 6
                  </Grid>
                
                 </Grid>
             
        </div>
    )
}
