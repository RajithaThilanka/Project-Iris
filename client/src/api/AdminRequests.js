import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });
//Sent token
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getAllUsers = () => API.get("/users/adminUsers");

export const getAllVeriReq = () => API.get("/users/verify-requests");

export const getProfileReports = () =>
  API.get("/report?adminId=63ea7cf44f8e3d42323eefc5&");
export const deleteaUser = (id) => API.delete(`/users/${id}`);

export const updateClusters = () => API.get("/users/cluster");
