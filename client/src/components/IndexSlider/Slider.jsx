import React from 'react'
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import '../../styleComponents/slider.css'

import image1 from "../../images/slider/slide_1.jpg";
import image2 from "../../images/slider/slide_2.jpg";
import image3 from "../../images/slider/slide_3.jpg";
import image4 from "../../images/slider/slide_4.jpg"
import image5 from "../../images/slider/slide_5.jpg";
import image6 from "../../images/slider/slide_6.jpeg";


function Slider() {
    return (
        <div>
            
            
  <ImageSlider images={[image1, image2, image3, image4, image5, image6]}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "right",
              color: "#fff",
            }
          }
        >
            <h1 className="sli">YOUR SOUL <br />MATE IS<br /> WAITING</h1>

            <Link to="/login">
              <Button variant="contained" size="large" style={{ maxHeight: '60px', maxWidth:'190px', minWidth: '190px', minHeight: '60px',fontSize:'20px' }} >
                  Join Now
              </Button>
            </Link> 
          
          </div>
        </ImageSlider>

        </div>
    )
}

export default Slider
