import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

export const logIn = (formData) => API.post("/users/login", formData);

export const signUp = (formData) => API.post("/users/signup", formData);

export const verifyMail = (userId, token) =>
  API.patch(`/users/verify/${userId}/${token}`);

export const signupAccountInfo = (formData) =>
  API.post("/users/signup/account-info", formData);

export const signupUserInfo = (formData) =>
  API.post("/users/signup/user-info", formData);

export const signupProfileView = (formData) =>
  API.post("/users/signup/profile-view", formData);
export const signupLookingforInfo = (formData) =>
  API.post("/users/signup/lookingfor-info", formData);

export const forgotPassword = (email) =>
  API.post("/users/forgot-password", { email });

export const resetPassword = (formData, token) =>
  API.patch(`/users/reset-password/${token}`, formData);
