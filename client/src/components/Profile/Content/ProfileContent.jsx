import React from "react";
import ProComplete from '../../../components/Profile/ProfileComplete/profilecomplete';
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
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Factfile from   '../ProfileFactfiles/Factfile'
import { useTheme } from "@emotion/react";

function ProfileContent() {

  const theme = useTheme();
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
        borderRadius={0}
      >
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>Introduce Yourself</FormLabel>
                <Textarea minRows={3} >   </Textarea>
              </FormControl>
            </CardContent>

            <CardActions>
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
                <Button variant="outlined" endIcon={<SaveIcon />}>
                 Save
                </Button>
              </Stack>
            </CardActions>
          </Card>
          
        </Grid>

        <Grid item xs={4}>
      
          <Card sx={{width:'100'}}>
            <CardContent>
              <ProComplete /> 
              <Typography>
                  Profile Completetion
              </Typography>

            </CardContent>
          </Card>
          
        </Grid>

        <Grid item xs={8}>
          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>About me</FormLabel>
                <Textarea minRows={3} > </Textarea>
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
                <Button variant="outlined" endIcon={<SaveIcon />}>
                 Save
                </Button>
                
              </Stack>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>Introduce Yourself</FormLabel>
                <Textarea minRows={3} > </Textarea>
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
                <Button variant="outlined" endIcon={<SaveIcon />}>
                 Save
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={8} justifyContent={'left'} >
          <Paper elevation={0} sx={{ p: 2 }}>

          <Stack direction='column' spacing={2} xs={{width:'100' }}>
             <Card sx={{ width: 'auto' }}>
            <CardContent>
              <FormControl>
                <FormLabel>Lifestytle</FormLabel> 
                <Textarea minRows={3} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
               <Button variant="outlined" endIcon={<SaveIcon />}>
                 Save
                </Button>
              </Stack>
            </CardActions>
          </Card>

          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>Sports</FormLabel>
                <Textarea minRows={3} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
               <Button variant="outlined" endIcon={<SaveIcon />}>
                 Save
                </Button>
              </Stack>
            </CardActions>
          </Card>

          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>Food and Drink</FormLabel>
                <Textarea minRows={3} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
               <Button variant="outlined" endIcon={<SaveIcon />}>
                 Save
                </Button>
              </Stack>
            </CardActions>
          </Card>  
          </Stack>
        </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={0} sx={{ p: 3 }}>
               <Factfile />
          </Paper>
           
        </Grid>

      </Grid>
    </div>
  );
}

export default ProfileContent;
