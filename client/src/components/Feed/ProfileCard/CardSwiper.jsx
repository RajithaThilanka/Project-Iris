import React from "react";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Navigation } from "swiper";
import { Grid, Box } from "@mui/material";
import ACTCARD from "./ProfileCard";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CardSwiper = () => {
  return (
    <div className="cardSwiper">
      <br />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="left"
        margin="3"
      >
        <Grid xs={3}>
          <Stack
            direction={{ xs: "column", sm: "column" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Item>Item 1</Item>
            <Item>Item 2</Item>
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <ACTCARD />
            </SwiperSlide>
            <SwiperSlide>
              <ACTCARD />
            </SwiperSlide>
            <SwiperSlide>
              <ACTCARD />
            </SwiperSlide>
            <SwiperSlide>
              <ACTCARD />
            </SwiperSlide>
          </Swiper>
        </Grid>

        <Grid xs={3}>
          <Stack
            direction={{ xs: "column", sm: "column" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Item>Item 1</Item>
            <Item>Item 2</Item>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default CardSwiper;
