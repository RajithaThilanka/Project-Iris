import {
  Box,
  Button,
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
import { useLocation, useNavigate } from "react-router-dom";
import { signupUserInfo } from "../../../api/AuthRequests";

import { getCountries } from "../../../api/CountryRequest";

import MultipleSelectChip from "../../UIComponents/MultipleSelectChip";
import { StyledFormControlLabel } from "../../UIComponents/Radio";

function UserInfo() {
  const {
    state: { id },
  } = useLocation();

  const [formData, setData] = useState({
    gender: "male",
    country: "",
    dob: "",
    languages: [],
    occupation: "",
    educationLevel: "",
    monthlyIncome: "",
    hasChildren: false,
    religion: "",
    ethnicity: "",
    ft: 0,
    in: 0,
    userId: id,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...formData, height: formData.ft + formData.in * 0.0833333 });

    try {
      const {
        data: {
          data: { data },
        },
      } = await signupUserInfo(formData);
      navigate(`/auth/signup/profileview-info`, {
        replace: true,
        state: {
          id: data._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const { data } = await getCountries();
        let c = data;
        c.sort(function (a, b) {
          return ("" + a.name.common).localeCompare(b.name.common);
        });
        setCountries(c);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCountries();
  }, []);

  const languages = [
    "Abkhazian",
    "Afar",
    "Afrikaans",
    "Akan",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Assamese",
    "Awadhi",
    "Aymara",
    "Azerbaijani",
    "Balochi",
    "Bashkir",
    "Basque",
    "Belarussian",
    "Bengali",
    "Bhojpuri",
    "Bhutani",
    "Bihari",
    "Bislama",
    "Breton",
    "Bulgarian",
    "Burmese",
    "Catalan",
    "Cebuano",
    "Chechen",
    "Chinese",
    "Corsican",
    "Croatian",
    "Czech",
    "Dakhini",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Faeroese",
    "Fiji",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Greenlandic",
    "Guarani",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hebrew",
    "Hindi",
    "Hungarian",
    "Icelandic",
    "Indonesian",
    "Interlingua",
    "Interlingue",
    "Inupiak",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kabyle",
    "Kannada",
    "Kashmiri",
    "Kazakh",
    "Khmer",
    "Kinyarwanda",
    "Kirghiz",
    "Kirundi",
    "Konkani",
    "Korean",
    "Kurdish",
    "Laothian",
    "Latin",
    "Latvian",
    "Lingala",
    "Lithuanian",
    "Lombard",
    "Luxembourgish",
    "Macedonian",
    "Maithili",
    "Makhuwa",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Marwari",
    "Moldavian",
    "Mongolian",
    "Nauru",
    "Nepali",
    "Norwegian",
    "Occitan",
    "Oriya",
    "Oromo",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Quechua",
    "Rhaeto-Romance",
    "Rifian",
    "Romanian",
    "Russian",
    "Samoan",
    "Sangro",
    "Sanskrit",
    "Scottish Gaelic",
    "Serbian",
    "Serbo-Croatian",
    "Sesotho",
    "Setswana",
    "Shona",
    "Sindhi",
    "Sinhalese",
    "Siswati",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tagalog",
    "Tajik",
    "Tamazight",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Tibetan",
    "Tigrinya",
    "Tonga",
    "Tsonga",
    "Tuareg",
    "Turkish",
    "Turkmen",
    "Twi",
    "Ukrainian",
    "Urdu",
    "Uyghur",
    "Uzbek",
    "Vietnamese",
    "Volapuk",
    "Welsh",
    "Wolof",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu",
  ];

  const handleData = (event) => {
    if (event.target.name === "hasChildren") {
      event.target.value === "true"
        ? setData({ ...formData, [event.target.name]: true })
        : setData({ ...formData, [event.target.name]: false });
    } else if (event.target.name === "ft" || event.target.name === "in") {
      if (isNaN(+event.target.value)) return;
      setData({ ...formData, [event.target.name]: +event.target.value });
    } else {
      setData({ ...formData, [event.target.name]: event.target.value });
    }
  };
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="account-info-form">
        <Grid container spacing={3} py={1} px={3} margin={2}>
          <Grid sm={12} xs={12}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ borderRadius: "50%", width: "4rem", height: "4rem" }}
                src={serverPublic + "irislogo.png"}
                alt="logo"
              />
            </div>
          </Grid>
          <Grid sm={12} xs={12}>
            <h3 className="heading-tertiary signup-heading">
              Tell us about yourself
            </h3>
          </Grid>

          <Grid sm={3} xs={12}>
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
                  checked={formData?.gender === "male"}
                />
                <StyledFormControlLabel
                  name="gender"
                  value="female"
                  label="female"
                  control={<Radio />}
                  checked={formData?.gender === "female"}
                />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid sm={3} xs={12}>
            <Stack spacing={1.5}>
              <FormLabel sx={{ marginLeft: "0.7rem" }} required>
                Height
              </FormLabel>
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
                  value={formData.ft}
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
                  value={formData.in}
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel>Country</FormLabel>

              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="country"
                  onChange={handleData}
                  value={formData.country}
                >
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
          <Grid sm={6} xs={12}>
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
                value={formData.dob}
                required
              />
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={1.5}>
              <FormLabel>Languages you speak</FormLabel>
              <FormControl>
                <MultipleSelectChip
                  names={languages}
                  onChange={handleData}
                  value={formData.languages}
                  name="languages"
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>What you do?</FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="occupation"
                  onChange={handleData}
                  value={formData.occupation}
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
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Education</FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="educationLevel"
                  onChange={handleData}
                  value={formData.educationLevel}
                >
                  <MenuItem value="">
                    <em>Not Specified</em>
                  </MenuItem>
                  <MenuItem key="high school" value="high school">
                    High school
                  </MenuItem>
                  <MenuItem key="college" value="college">
                    Some college
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
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Religion</FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="religion"
                  onChange={handleData}
                  value={formData.religion}
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
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>Ethnicity</FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="ethnicity"
                  onChange={handleData}
                  value={formData.ethnicity}
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
          <Grid sm={6} xs={12}>
            <Stack spacing={2}>
              <FormLabel sx={{ marginLeft: "0.7rem" }}>
                Monthly Income
              </FormLabel>
              <FormControl sx={{ m: 1 }} fullWidth size="small" required>
                <Select
                  name="monthlyIncome"
                  onChange={handleData}
                  value={formData.monthlyIncome}
                >
                  <MenuItem
                    key="less than Rs.25,000"
                    value="less than Rs.25,000"
                  >
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
          <Grid sm={6} xs={12}>
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
                  checked={formData.hasChildren === true}
                />
                <StyledFormControlLabel
                  name="hasChildren"
                  value={false}
                  label="no"
                  control={<Radio />}
                  checked={formData.hasChildren === false}
                />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={12} xs={1}></Grid>
          <Grid sm={4} xs={1}></Grid>
          <Grid sm={4} xs={6}>
            <Button variant="contained" fullWidth type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default UserInfo;
