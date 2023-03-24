import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import Navbar from "../Appbar/Navbar";

const AboutUs = () => {
  return (
    <>

      <Container maxWidth="md">

        <Typography variant="h4" align="center" gutterBottom>
          About Us
      </Typography>
        <Typography variant="body1" align="justify" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
          mauris mauris, a sollicitudin justo blandit a. Duis euismod euismod
          ipsum, id commodo orci placerat vitae. Donec nec elit euismod,
          ullamcorper leo eget, facilisis sapien. Integer at laoreet enim. Morbi
          vitae arcu euismod, dictum nisi eget, ultrices orci. Duis nec augue nec
          tellus dignissim ullamcorper. Aliquam commodo volutpat tellus, id
          interdum ex lobortis id.
      </Typography>
        <Typography variant="body1" align="justify" gutterBottom>
          Praesent ullamcorper suscipit justo, ac bibendum mi. Vivamus luctus
          sapien vel nunc commodo, vitae finibus velit vulputate. Duis gravida
          commodo massa a rutrum. In hac habitasse platea dictumst. Aenean
          scelerisque vitae magna ac posuere. Suspendisse sed magna quis est
          sagittis eleifend vel eu dui. Ut sollicitudin, nulla in vehicula
          efficitur, lorem est tristique leo, eu lacinia mi turpis sit amet erat.
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Our Mission
          </Typography>
            <Typography variant="body2" align="justify">
              Nullam interdum euismod turpis, vel efficitur tellus varius vel.
              Integer eu est consequat, venenatis velit eget, hendrerit enim.
              Vestibulum rhoncus imperdiet tortor vel lacinia.
          </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Our Vision
          </Typography>
            <Typography variant="body2" align="justify">
              Proin eget enim at est eleifend sollicitudin. Sed hendrerit blandit
              augue id imperdiet. Vivamus eget ante quis dolor rutrum interdum eu
              vel justo. Quisque non libero non massa ultricies dictum.
          </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutUs;
