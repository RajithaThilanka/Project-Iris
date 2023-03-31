import VerificationCard from "./VerificationCard";
import { getCountries } from "../../../src/api/CountryRequest";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./verification.css";
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
import "./verification.css";
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
        <Stack spacing={4}>
          <FormControl sx={{ m: 1 }} fullWidth size="small" required>
            <Stack direction="column" spacing={10}></Stack>
            <Typography variant="h6" className="verification-text">
              Use a government-issued document
            </Typography>

            <Stack spacing={2} direction="column">
              <Button startIcon={""} variant="contained">
                <Link className="linkStyle" to="/me/uploadimages">
                  Identity Card
                </Link>
              </Button>
              <Button variant="contained">
                <Link className="linkStyle" to="/me/uploadimages">
                  Passport
                </Link>
              </Button>
              <Button variant="contained">
                <Link to="/me/uploadimages" className="linkStyle">
                  Driving Liceense
                </Link>
              </Button>
            </Stack>
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
