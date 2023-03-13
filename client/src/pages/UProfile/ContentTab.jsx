import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import About from "../../components/Profile/Content/ProfileContent";
import ProAbout from "../../pages/UProfile/About/ProfileAbout";
import Profileconnection from "./ProfileConnection/Profileconnection";
import { useSelector } from "react-redux";
import ProfileSettings from "../../components/Profile/ProfileSettings/ProfileSettings";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  //  const {
  //     data: { user },
  //   } = useSelector((state) => state.authReducer.authData);

  //   console.log(user.firstname)

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ContentTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", justifyContent: "center" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Connections" {...a11yProps(1)} />
          <Tab label="Setings" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProAbout />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Profileconnection />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileSettings />
      </TabPanel>
    </Box>
  );
}
