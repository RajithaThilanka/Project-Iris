import '../../App.css'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FormLabel from '@mui/material/FormLabel';

function registration() {
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

                    <Grid><h1>Register now for free</h1></Grid>

                    <Grid>     
                     <Box component="form" 
                       sx={{
                     '& > :not(style)': { m: 1, width: '45ch' },
                      }}
                       noValidate
                       autoComplete="off"
                     >
                      <TextField label="Email" color="secondary"  />
                      <TextField label="Password" color="secondary"   />
                      <TextField label="Confirm Password" color="secondary"   />

                      </Box> 
                     </Grid>                   

                     <Grid  sx={{padding:2 }}>
                         <Button  variant="contained"  disableElevation sx={{backgroundColor:"#ED1E82"}} style={{ padding: "11px 140px" ,borderRadius:"50px",}}>
                         Register Now
                         </Button>
                    </Grid>

                 </Grid>
            </Grid> 
        </Grid>
    )
}

export default registration
