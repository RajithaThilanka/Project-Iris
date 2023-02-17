import React from 'react'
import Bar from '../components/Appbar/MainAppbar'
import {Box , Grid, Stack,Typography,Button } from '@mui/material'
import { Link } from "react-router-dom";
import Slider from '../components/IndexSlider/ImageSlider';

function welcomepage() {
  return (
    <div>

<Grid container my={5}
  
  display="flex"
  justifyContent="center"
  alignItems="center"
  
>
	<Grid item xs={12} >
      <Bar />
	</Grid>

	<Grid item xs={12} >
        <Slider />
	</Grid>

	<Grid item xs={12} marginBottom='10' my={4} >
           <Stack direction='row' spacing={2} className='indexSecnd' sx={{
               textAlign:"center",
               alignItems:"center",
               justifyContent:"center"

           }}>  
           <Box component="span" sx={{
                      backgroundColor: '#C81172',
                      color:'white',
                      height:'100px',
                      width:'400px',
                      borderRadius: '18px',
                      padding:'16px',
                      '&:hover':{
                        backgroundColor:'#C81172',
                        opacity: [0.9, 0.8, 0.7],
                      }
                  }}>
                        High Quality Matching algorithm
                  </Box>

                  <Box marginBottom='10' sx={{
                      backgroundColor: '#C81172',
                      color:'white',
                      height:'100px',
                      width:'400px',
                      borderRadius: '18px',
                      padding:'16px',
                      mx: 'auto',
                      '&:hover':{
                          backgroundColor:'#C81172',
                          opacity: [0.9, 0.8, 0.7],
                      }
                  }}>
                        Increased capability
                  </Box>

                  <Box component="span" sx={{
                      backgroundColor: '#C81172',
                      color:'white',
                      height:'100px',
                      width:'400px',
                      padding:'16px',
                      borderRadius: '18px',
                      '&:hover':{
                        backgroundColor:'#C81172',
                        opacity: [0.9, 0.8, 0.7],
                      }
                  }}>
                        High Quality Matching algorithm
                  </Box>

           </Stack>

	</Grid>

	<Grid item xs={12} backgroundColor='#FFD7EC' textAlign="center" height='150px' >
            <Box className='IndexIntro'> 
               <Typography variant='h6'>  Introducing: A new Iris experience </Typography> 
                <Typography variant='h8'> We suggest you the best fit person on our platform for a long lasting relationship with having better privacy.</Typography>
              </Box>
          <Link to="/login">
              <Button variant="contained" >
                  Join Now
              </Button>
          </Link>    
	</Grid>

	<Grid item xs={12} textAlign="center" height='150px' >
            <Box className='IndexIntro'> 
               <Typography variant='h6'> Increased capability </Typography> 
                <Typography variant='h8'> AI algorithm gives the best fit compared to other matching platforms  </Typography>
              </Box>

          <Link to="/login">
              <Button variant="contained" >
                  Join Now
              </Button>
          </Link>   

	</Grid>

    
    <Grid item xs={12} backgroundColor='#FFD7EC' textAlign="center" height='150px' >
            <Box className='IndexIntro'> 
               <Typography variant='h6'> High quality matching  </Typography> 
                <Typography variant='h8'> Matching is done based on your personal interests and characteristics</Typography>
              </Box>
              
          <Link to="/login">
              <Button variant="contained" >
                  Join Now
              </Button>
          </Link>   
 	</Grid>

    <Grid item xs={12} textAlign="center" height='150px' >
            <Box className='IndexIntro'> 
               <Typography variant='h6'>  Service </Typography> 
                <Typography variant='h8'>We give a platform with advance privacy features </Typography>
              </Box>

          <Link to="/login">
              <Button variant="contained" >
                  Join Now
              </Button>
          </Link>   
	</Grid>

  <Grid item xs={12} textAlign="center" height='150px' >
            <Box className='IndexIntro'> 
               <Typography variant='h6'>   © 2023 Project Iris. All Rights Reserved  </Typography> 
              </Box>
	</Grid>

</Grid>

      
    </div>
  )
}

export default welcomepage
