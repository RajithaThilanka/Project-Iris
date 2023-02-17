import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Content,
  Button,
  CardActions,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

function ProfileContent() {
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
          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>Introduce Yourself</FormLabel>
                <Textarea minRows={5} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <FormControl>
                <FormLabel> Profile Completetion </FormLabel>
                <Textarea minRows={5} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>About me</FormLabel>
                <Textarea minRows={5} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
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
                <Textarea minRows={5} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>

        <Grid
          item
          xs={8}
          justifyContent="left"
          container
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>Lifestytle</FormLabel>
                <Textarea minRows={5} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
              </Stack>
            </CardActions>
          </Card>

          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>Sports</FormLabel>
                <Textarea minRows={5} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
              </Stack>
            </CardActions>
          </Card>

          <Card>
            <CardContent>
              <FormControl>
                <FormLabel>Food and Drink</FormLabel>
                <Textarea minRows={5} />
              </FormControl>
            </CardContent>

            <CardActions alignItems="center">
              <Stack direction="row" spacing={2} justifyContent="right">
                <Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>
                  Edit
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileContent;
