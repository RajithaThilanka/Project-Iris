import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Slider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import MatchesContext from "../../context/matches";
import MultipleSelectChip from "../UIComponents/MultipleSelectChip";
import "./Filter.css";

function valuetext(value) {
  return `${value}°C`;
}

function Filter() {
  const minDistance = 10;
  const { filter, setFilter } = useContext(MatchesContext);
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 120 - minDistance);
        setFilter({ ...filter, age: [clamped, clamped + minDistance] });
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setFilter({ ...filter, age: [clamped - minDistance, clamped] });
      }
    } else {
      setFilter({ ...filter, age: newValue });
    }
  };

  const handleChange = (event) => {
    setFilter({
      ...filter,
      gender: {
        ...filter.gender,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const handleData = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(filter);
  };
  return (
    <div className="filter-bar">
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="age-filter">
          <FormLabel style={{ color: "#000", fontSize: "inherit" }}>
            Age
          </FormLabel>

          <Slider
            size="small"
            getAriaLabel={() => "Minimum distance shift"}
            value={filter.age}
            onChange={handleChange2}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
          />
        </div>
        <div className="gender-filter">
          <FormLabel style={{ color: "#000", fontSize: "inherit" }}>
            Gender
          </FormLabel>
          <div>
            <FormControlLabel
              sx={{ color: "#000" }}
              control={
                <Checkbox
                  checked={filter.gender.male}
                  onChange={handleChange}
                  name="male"
                  size="small"
                />
              }
              label="Male"
            />
            <FormControlLabel
              sx={{ color: "#000" }}
              control={
                <Checkbox
                  checked={filter.gender.female}
                  onChange={handleChange}
                  name="female"
                  size="small"
                />
              }
              label="Female"
            />
          </div>
        </div>
        <div className="looking-for-country">
          <FormLabel style={{ color: "#000", fontSize: "inherit" }}>
            Countries
          </FormLabel>
          <FormControl>
            <MultipleSelectChip
              names={["Sri Lanka", "India", "Pakistan"]}
              onChange={handleData}
              value={filter.countries}
              name="countries"
              className="countriy-chip"
            />
          </FormControl>
        </div>
        <div className="looking-for-languages">
          <FormLabel style={{ color: "#000", fontSize: "inherit" }}>
            Languages
          </FormLabel>
          <FormControl>
            <MultipleSelectChip
              names={["English", "Tamil", "Hindi"]}
              onChange={handleData}
              value={filter.languages}
              name="languages"
            />
          </FormControl>
        </div>
        <Button type="submit" variant="contained">
          Filter
        </Button>
      </form>
    </div>
  );
}

export default Filter;
