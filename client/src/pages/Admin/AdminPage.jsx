import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import AdminSearch from "../../components/Admin/SearchBar/SearchAppBar";
import { useState } from "react";
import Box from "@mui/material/Box";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Allprofiles from "../../components/Admin/AllProfiles/Allprofiles";
import Profilereports from "../../components/Admin/Profilereport/Profilereports";
import UserVerificationView from "../../components/Admin/UserVerificationData/UserVerificationView";
import VerificationRequests from "../../components/Admin/VerificationRequests/VerificationRequests";
import SuspendedAccounts from "../../components/Admin/SuspendedAccounts/SuspendedAccounts";
import AdminSettings from "../../components/Admin/AdminSettings/AdminSettings";

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
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="left"
        spacing={1}
        // padding={1}
      >
        <Grid item xs={12}>
          <AdminSearch />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "224px",
              width: "100%",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="fix"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="All Profiles" {...a11yProps(0)} />
              <Tab label="Varification Requests" {...a11yProps(1)} />
              <Tab label="Profile Reports" {...a11yProps(2)} />
              <Tab label="Suspended Acccoounts" {...a11yProps(3)} />
              <Tab label="Admin Settings" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Allprofiles />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <VerificationRequests />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Profilereports />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <SuspendedAccounts />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <AdminSettings />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
