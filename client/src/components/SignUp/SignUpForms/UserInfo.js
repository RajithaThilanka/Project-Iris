import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useEffect, useState } from "react";
import { getCountries } from "../../../api/CountryRequest";

import MultipleSelectChip from "../../UIComponents/MultipleSelectChip";
import { StyledFormControlLabel } from "../../UIComponents/Radio";

function UserInfo({ data, setData }) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const { data } = await getCountries();

        setCountries(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCountries();
  }, []);
  const handleData = (event) => {
    if (event.target.name === "hasChildren") {
      event.target.value === "true"
        ? setData({ [event.target.name]: true })
        : setData({ [event.target.name]: false });
    } else if (event.target.name === "ft" || event.target.name === "in") {
      setData({
        [event.target.name]: +event.target.value,
      });
    } else {
      setData({ [event.target.name]: event.target.value });
    }
  };
  return (
    <Box
      sx={{
        width: "80vw",
        margin: "6rem auto",
        height: "60rem",
        boxShadow: "4rem 4rem 5rem rgba(0, 0, 0, 0.06)",
        overflow: "scroll",
      }}
    >
      <Grid container spacing={3} py={1} px={3} margin={2}>
        <Grid sm={3}>
          <Stack spacing={2}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              sx={{ display: "flex", flexDirection: "row" }}
              onChange={handleData}
            >
              <StyledFormControlLabel
                name="gender"
                value="male"
                label="male"
                control={<Radio />}
                checked={data?.gender === "male"}
              />
              <StyledFormControlLabel
                name="gender"
                value="female"
                label="female"
                control={<Radio />}
                checked={data?.gender === "female"}
              />
            </RadioGroup>
          </Stack>
        </Grid>
        <Grid sm={3}>
          <Stack spacing={1.5}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Height</FormLabel>
            <FormControl sx={{ m: 1 }} variant="filled">
              <FilledInput
                name="ft"
                endAdornment={
                  <InputAdornment position="end">ft</InputAdornment>
                }
                inputProps={{
                  "aria-label": "height-feet",
                }}
                onChange={handleData}
                value={data.ft}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="filled">
              <FilledInput
                name="in"
                endAdornment={
                  <InputAdornment position="end">in</InputAdornment>
                }
                inputProps={{
                  "aria-label": "height-inch",
                }}
                onChange={handleData}
                value={data.in}
              />
            </FormControl>
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={2}>
            <FormLabel>Country</FormLabel>

            <FormControl sx={{ m: 1 }} fullWidth size="small" required>
              <Select name="country" onChange={handleData} value={data.country}>
                <MenuItem value="">
                  <em>Not Specified</em>
                </MenuItem>

                {countries.map((country, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={country.name.common.toLowerCase()}
                    >
                      {country.name.common}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={1.5}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Birthday</FormLabel>
            <TextField
              id="date"
              label="dob"
              name="dob"
              type="date"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleData}
              value={data.dob}
            />
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={1.5}>
            <FormLabel>Languages you speak</FormLabel>
            <MultipleSelectChip
              names={["English", "Tamil", "Hindi"]}
              onChange={handleData}
              value={data.languages}
            />
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={2}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>What you do?</FormLabel>
            <FormControl sx={{ m: 1 }} fullWidth size="small" required>
              <Select
                name="occupation"
                onChange={handleData}
                value={data.occupation}
              >
                <MenuItem value="">
                  <em>Not Specified</em>
                </MenuItem>
                <MenuItem key="engineer" value="engineer">
                  Engineer
                </MenuItem>
                <MenuItem key="scientist" value="scientist">
                  Scientist
                </MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={2}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Education</FormLabel>
            <FormControl sx={{ m: 1 }} fullWidth size="small" required>
              <Select
                name="educationLevel"
                onChange={handleData}
                value={data.educationLevel}
              >
                <MenuItem value="">
                  <em>Not Specified</em>
                </MenuItem>
                <MenuItem key="bachelor's degree" value="bachelor">
                  Bachelor's degree
                </MenuItem>
                <MenuItem key="graduate" value="graduate">
                  Graduate
                </MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={2}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Religion</FormLabel>
            <FormControl sx={{ m: 1 }} fullWidth size="small" required>
              <Select
                name="religion"
                onChange={handleData}
                value={data.religion}
              >
                <MenuItem value="">
                  <em>Not Specified</em>
                </MenuItem>
                <MenuItem key="buddhist" value="buddhist">
                  Buddhist
                </MenuItem>
                <MenuItem key="hindu" value="hindu">
                  Hindu
                </MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={2}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Ethnicity</FormLabel>
            <FormControl sx={{ m: 1 }} fullWidth size="small" required>
              <Select
                name="ethnicity"
                onChange={handleData}
                value={data.ethnicity}
              >
                <MenuItem key="sinhalese" value="sinhalese">
                  Sinhalese
                </MenuItem>
                <MenuItem key="tamil" value="tamil">
                  Tamil
                </MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={2}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>Monthly Income</FormLabel>
            <FormControl sx={{ m: 1 }} fullWidth size="small" required>
              <Select
                name="monthlyIncome"
                onChange={handleData}
                value={data.monthlyIncome}
              >
                <MenuItem key="less than Rs.25,000" value="less than Rs.25,000">
                  less than Rs.25,000
                </MenuItem>
                <MenuItem
                  key="between Rs.25,000 & Rs.50,000"
                  value="between Rs.25,000 & Rs.50,000"
                >
                  between Rs.25,000 & Rs.50,000
                </MenuItem>
                <MenuItem
                  key="between Rs.50,000 & Rs.100,000"
                  value="between Rs.50,000 & Rs.100,000"
                >
                  between Rs.50,000 & Rs.100,000
                </MenuItem>
                <MenuItem
                  key="between Rs.100,000 & Rs.150,000"
                  value="between Rs.100,000 & Rs.150,000"
                >
                  between Rs.100,000 & Rs.150,000
                </MenuItem>
                <MenuItem
                  key="more than Rs.150,000',"
                  value="more than Rs.150,000',"
                >
                  more than Rs.150,000',
                </MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Stack>
        </Grid>
        <Grid sm={6}>
          <Stack spacing={2}>
            <FormLabel sx={{ marginLeft: "0.7rem" }}>
              Do you have children?
            </FormLabel>
            <RadioGroup
              name="hasChildren"
              onChange={handleData}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                padding: "0 1rem",
              }}
            >
              <StyledFormControlLabel
                name="hasChildren"
                value={true}
                label="yes"
                control={<Radio />}
                checked={data.hasChildren === true}
              />
              <StyledFormControlLabel
                name="hasChildren"
                value={false}
                label="no"
                control={<Radio />}
                checked={data.hasChildren === false}
              />
            </RadioGroup>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserInfo;
