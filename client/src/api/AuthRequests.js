import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

export const logIn = (formData) => API.post("/users/login", formData);

export const signUp = (formData) => API.post("/users/signup", formData);

export const verifyMail = (userId, token) =>
  API.patch(`/users/verify/${userId}/${token}`);
