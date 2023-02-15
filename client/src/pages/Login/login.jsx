import '../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FormLabel from '@mui/material/FormLabel';

function login() {
  return (

    <Grid className='Login-page'>
      <Grid className='subLogin-page'>
          <Grid>
           <Grid justifyContent="flex-end" display="flex" sx={{mx:.5 ,padding:1 }} >
            <IconButton  >
             <CloseIcon/>
            </IconButton>
           </Grid>
            
            <Grid>
               <Stack spacing={4} direction="row" justifyContent={"center" } >
                 <Button variant="outlined" sx={{backgroundColor:"#F2EEFF"}}>Registration</Button> 
                 <Button variant="text" >Log in</Button>
              </Stack>
            </Grid>

            <Grid><h1>Log in</h1></Grid>

            <Grid>     
               <Box component="form" 
                  sx={{
                    '& > :not(style)': { m: 1, width: '45ch' },
                  }}
                    noValidate
                    autoComplete="off"
                >
                <FormLabel >Your login is not valid please check your data</FormLabel>
                <TextField label="Email" color="secondary"  />
                <TextField label="Password" color="secondary"   />
               </Box> 
            </Grid>

            <Grid justifyContent="flex-end" display="flex" sx={{padding:1  }}>
                 <Button variant="text" sx={{fontWeight:'bold',fontSize:12 , mx: 2,fontStyle:'italic'}}>Forgotton   Password</Button>
            </Grid>

            <Grid  sx={{padding:2 }}>
               <Button  variant="contained"  disableElevation sx={{backgroundColor:"#ED1E82"}} style={{ padding: "11px 170px" ,borderRadius:"50px",}}>
                Log in
               </Button>
            </Grid>

            <Grid>
              <Stack direction="row" spacing={0} justifyContent={"center"}>
                 <FormLabel  >Don't have an account? </FormLabel>
                <Button href="#text-buttons" sx={{padding:0 }}>Join</Button>
              </Stack>
            </Grid>

          </Grid>
      </Grid>
    </Grid>
  )
}

export default login
