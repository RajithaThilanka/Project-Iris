import React from 'react'

import AdminDatagrid from '../../components/Admin/Datagrid/AdminDatagrid'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import AdminSearch from '../../components/Admin/SearchBar/SearchAppBar'
import { useState } from "react"
import Box from '@mui/material/Box';

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Allprofiles from '../../components/Admin/AllProfiles/Allprofiles';
import Profilereports from '../../components/Admin/Profilereport/Profilereports'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}


export default function AdminPage() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <div> 
            <Grid container direction="row" justifyContent="center" alignItems="left" spacing={2} padding={1}>
                <Grid item xs={12} >
                    <AdminSearch />
    </Grid>

<Grid item xs={9} >
  <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="All Profiles" {...a11yProps(0)} />
        <Tab label="Varification requests" {...a11yProps(1)} />
        <Tab label="Profile reports" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Allprofiles />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminDatagrid />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Profilereports />
      </TabPanel>
    </Box>                 
    </Grid> 

    <Grid item xs={3} >
        <Box sx={{ width: '400px', height: '500px', border: 1, borderRadius: 0.5 }}>              
          Content
        </Box>
    </Grid>
                
                
</Grid>
        </div>
    )
}
