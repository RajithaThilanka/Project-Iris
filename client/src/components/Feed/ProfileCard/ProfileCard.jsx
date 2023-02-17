import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

function ProfileCard() {
  return (
    <div>
      <Box sx={{ width: 600, height: "100" }}>
        <Card>
          <CardMedia
            component="img"
            height="400px"
            image="https://source.unsplash.com/random"
            alt="unplash image"
          />

          <CardContent>
            <Typography gutterBottom varient="h5" component="div">
              Name,24{" "}
              <Button size="Large" varient="contained" color="primary">
                {" "}
                Connect{" "}
              </Button>
            </Typography>

            <Typography varient="body2" color="text.secondary">
              Software developer
            </Typography>

            <Typography varient="body2" color="text.secondary">
              Country: Sri Lanka
            </Typography>

            <Typography varient="body2" color="text.secondary">
              I am looking for someone who is a great time but also has a kind
              heart. I love traveling.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default ProfileCard;
