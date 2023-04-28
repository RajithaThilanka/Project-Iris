import axios from "axios";

export const getCountries = () =>
  axios.get("https://restcountries.com/v3.1/all");

// export const signUp = (formData) => API.post("/auth/register", formData);