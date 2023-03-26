import VerificationCard from "./VerificationCard";
import { getCountries } from "../../../src/api/CountryRequest";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function IdVerification({ data, setData }) {
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

  const navigate = useNavigate();

  return (
    <div>
      <VerificationCard title={"Identity verification"}>
        <Stack spacing={2}>
          <FormControl sx={{ m: 1 }} fullWidth size="small" required>
            {/* <FormLabel>Select Country:</FormLabel>
          
            <Select name="country" onChange={handleData} defaultValue="default">
              <MenuItem value="default">
                <em>Choose Country</em>
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
            </Select> */}
            <h3 className="verification-text">
              Use a government-issued document
            </h3>
            <div>
              <Stack spacing={2} direction="column">
                <Button variant="outlined" className="idtype-button">
                  <Link to="/uploadimage">Identity Card</Link>
                </Button>
                <Button variant="outlined">
                  <Link to="/uploadimage">Passport</Link>
                </Button>
                <Button variant="outlined">
                  <Link to="/uploadimage">Driving Liceense</Link>
                </Button>
              </Stack>
            </div>
          </FormControl>
        </Stack>
        <Typography
          sx={{ fontSize: 22, fontFamily: "Poppins, sans-serif", color: "red" }}
        >
          Iris
        </Typography>
      </VerificationCard>
    </div>
  );
}

export default IdVerification;
