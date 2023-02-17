import React from 'react'
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import '../../styleComponents/slider.css';

import image1 from "../../images/Indexslider/slide_1.jpeg";
import image2 from "../../images/Indexslider/slide_2.jpeg";
import image3 from "../../images/Indexslider/slide_3.jpeg";
import image4 from "../../images/Indexslider/slide_4.jpeg";


function Slider() {
    return (
        <div>
            
            
  <ImageSlider images={[image1, image2, image3, image4]}>
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
