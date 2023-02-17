import React from "react";
import Button from "@mui/material/Button";

import { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../../components/Feed/ProfileCard/style.css";


// import required modules
import { Navigation } from "swiper";
import { Grid, Box } from "@mui/material";
import ACTCARD from "../../components/Feed/ProfileCard/ProfileCard";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

 const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
 }));


 const Userfeed = () => {
  
     const [profiledetails, setProfile] = useState();
  
     return (
    <div className="cardSwiper">
      <Stack direction="row" spacing={5} padding={5} fontSize="10">
        <Button sx={{ fontSiz: "50px" }}>IRIS</Button>
      </Stack>

      <Grid container spacing={2} alignItems="left" margin="3">
        <Grid xs={3}>
          };
          <Box
            sx={{
              border: 1.5,
              paddingLeft: 2,
              borderRadius: 1,
              width: 400,
              height: 600,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              paddingLeft={5}
            >
              <Item>Item 1</Item>
              <Item>Item 2</Item>
            </Stack>
          </Box>
          
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
          <Box
            sx={{
              border: 1.5,
              paddingLeft: 2,
              borderRadius: 1,
              width: 400,
              height: 600,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "column" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Item>Item 1</Item>
              <Item>Item 2</Item>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Userfeed;
