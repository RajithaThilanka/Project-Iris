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

export const getAllUsers = () => API.get("/users");

export const getAllVeriReq = () => API.get("/users/verify-requests");

export const getProfileReports = () => API.get("/report/admin-reports");

export const deleteaUser = (userId) => API.delete(`/users/${userId}`);

export const manualVarifyAccount = (userId, status) =>
  API.patch(`/users/verify-account/${userId}`, { status });

export const reviewReport = (reportId, reviewStatus) =>
  API.patch("/report/review-report", { reportId, reviewStatus });