import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Stack } from '@mui/material';
import './Popup.css';
import Button from '@mui/material/Button';
export default function UserVerificationView() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }


    return (
        <div>

    <Stack spacing={1} direction="column">
    
    {/* <Button variant="outlined" onClick={togglePopup}>View Verification Request </Button>
       {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>This is a Popup</h2>
            <p>Popup content goes here...</p>
            <button  onClick={togglePopup}>Close Popup</button>
          </div>
        </div>
      )} */}

      <Box sx={{ width: '100%', height: '100%' }}>    
       <Box>    
        <Typography variant="h6"> NIC </Typography>            
        <Box sx={{ width: '100%', height: '180px', border: 1, borderRadius: 0.5 }} >              
            <Stack direction="row" spacing="1" sx={{justifyContent:"center"}}>
              <Box>
                  Frant side
              </Box>
              <Box>
                  back side
              </Box>
            
            </Stack>
          </Box>
          </Box>
          

                 <Box>    
        <Typography variant="h6"> Live Image </Typography>            
        <Box sx={{ width: '100%', height: '150px', border: 1, borderRadius: 0.5 }} >              
            <Stack direction="row" spacing="1" sx={{justifyContent:"center"}}>
              <Box>
                  Frant side
              </Box>
              <Box>
                  back side
              </Box>
            
            </Stack>
          </Box>
          </Box>
          

                 <Box>    
        <Typography variant="h6"> Live selfy </Typography>            
        <Box sx={{ width: '100%', height: '180px', border: 1, borderRadius: 0.5 }} >              
            <Stack direction="row" spacing="1" sx={{justifyContent:"center"}}>
              <Box>
                  Frant side
              </Box>
              <Box>
                  back side
              </Box>
            
            </Stack>
          </Box>
       </Box>
    </Box>

     </Stack>
        </div>
    )
}
