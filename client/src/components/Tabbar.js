import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Connections from "../pages/Connections/Connections";
import Friends from "../pages/Friends/Friends";
import { Divider } from "@mui/material";

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

export default function Tabbar() {
  const [value, setValue] = React.useState(0);
  console.log(value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "30vw",
        }}
      >
        <Tab label="Find a match" {...a11yProps(0)} />

        <Tab label="My Connections" {...a11yProps(1)} />

        <Tab label="My Friends" {...a11yProps(2)} />

        <Tab label="My Dates" {...a11yProps(3)} />

        <Tab label="Messages" {...a11yProps(4)} />

        {/* <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <div style={{ width: "70vw" }}>
          <Dashboard />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ width: "70vw" }}>
          <Connections />
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <div style={{ width: "70vw" }}>
          <Friends />
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div style={{ width: "70vw" }}>
          <p>My dates</p>
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <div style={{ width: "70vw" }}>
          <p>Messages</p>
        </div>
      </TabPanel>
    </Box>
  );
}
