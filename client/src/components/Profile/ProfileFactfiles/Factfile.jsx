import React from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BoyIcon from '@mui/icons-material/Boy';
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import PetsIcon from '@mui/icons-material/Pets';
import ChurchIcon from '@mui/icons-material/Church';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BookIcon from '@mui/icons-material/Book';
import { Paper } from '@mui/material';




export default function Factfile() {
   
   const [expanded, setExpanded] = React.useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  };

  
    return (
      <div>
        <Paper sx={{padding:3}}> 
     <Typography> FACTFILES </Typography>   

               <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        > <LocationOnIcon /> 
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            City of residence
          </Typography>
                    <br/>
          <Typography sx={{ color: "text.secondary" }}>
            ihala imbilgoda gampaha Srilanka
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
          </Accordion>
               <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        > <LocationOnIcon /> 
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            City of residence
          </Typography>
                    <br/>
          <Typography sx={{ color: "text.secondary" }}>
            ihala imbilgoda gampaha Srilanka
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
          </Accordion>
               <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        > <LocationOnIcon /> 
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            City of residence
          </Typography>
                    <br/>
          <Typography sx={{ color: "text.secondary" }}>
            ihala imbilgoda gampaha Srilanka
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
    </Accordion>


   <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        > <LocationOnIcon /> 
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            City of residence
          </Typography>
                    <br/>
          <Typography sx={{ color: "text.secondary" }}>
            ihala imbilgoda gampaha Srilanka
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
    </Accordion>
            
          











      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
                >
         <WorkIcon />
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Occupation</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Student
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
            </Accordion>

           <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >

         <BoyIcon />
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Body Type</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            5'1 inch
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
            </Accordion>  
                      

                 <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
                >
         <SchoolIcon />
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Highest degree</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            BCS in University of Ruhuna
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
            </Accordion>  
            
                 <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
                >
         <WorkIcon />
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Language</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Singhala
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
            </Accordion>  
            
                <Accordion
        expanded={expanded === "panel11"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
                >
         <WorkIcon />
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Marital Status</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Single
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
            </Accordion> 
            

                <Accordion
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
                >
         <WorkIcon />
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Children</Typography>
          <Typography sx={{ color: "text.secondary" }}>
             No
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion> 

            
                <Accordion
        expanded={expanded === "panel13"}
        onChange={handleChange("panel13")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
                >
         <ChurchIcon />
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Religion</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Buddhism
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion> 
            

    
      </Paper>   
     </div>
  )
}
