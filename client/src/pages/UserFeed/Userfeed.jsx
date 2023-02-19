import React from "react";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import FeedH from '../../components/Feed/FeedHeader/FeedHeader'
import FeedL from '../../components/Feed/LeftSide/FeedLeftcomponents'
import FeedR from '../../components/Feed/RightSide/FeedRigthComponent'


import { IconButton, Typography } from '@mui/material';
import { useRef, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
import ProCOn from "../../components/DataGrid/ConnectionGrid/ConGrid"
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
         
            <FeedH />
         
      <Grid container spacing={2} alignItems="left" margin="3">
           <Grid xs={3} >
          };
           
           <FeedL />
    
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

             <FeedR />

             
        </Grid>
      </Grid>
    </div>
  );
};

export default Userfeed;
