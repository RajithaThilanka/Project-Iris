import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getUser = (userId) => API.get(`/users/${userId}`);

export const getMatches = () => API.get("/users/me/suggestions");
export const sendConRequest = (id) =>
  API.post(`/users/me/connections/invite/${id}`);
export const getSentConRequests = () => API.get(`/users/me/connections/sent`);
export const getReceivedConRequests = () =>
  API.get(`/users/me/connections/received`);

export const acceptConnection = (id) =>
  API.patch(`/users/me/connections/accept/${id}`);
export const cancelConRequest = (id) =>
  API.delete(`/users/me/connections/cancel-request/${id}`);
export const getSentFriendRequests = () => API.get(`/users/me/friends/sent`);
export const getReceivedFriendRequests = () =>
  API.get(`/users/me/friends/received`);

export const acceptFriend = (id) => API.patch(`/users/me/friends/accept/${id}`);
export const cancelFriendRequest = (id) =>
  API.patch(`/users/me/friends/cancel/${id}`);

export const getAllConnections = () => API.get(`/users/me/connections`);
export const sendFriendRequest = (id) =>
  API.patch(`/users/me/friends/invite/${id}`);

export const removeConnection = (id) =>
  API.patch(`/users/me/connections/remove/${id}`);

export const getAllFriends = () => API.get(`/users/me/friends`);
export const getAllDates = () => API.get(`/users/me/dates`);

export const acceptDate = (id) => API.patch(`/users/me/dates/accept/${id}`);
export const cancelDateRequest = (id) =>
  API.delete(`users/me/dates/cancel/${id}`);
export const getReceivedDateRequests = () =>
  API.get(`/users/me/dates/received`);
export const getSentDateRequests = () => API.get(`/users/me/dates/sent`);
export const sendDateRequest = (id, data) =>
  API.post(`/users/me/dates/invite/${id}`, data);

export const searchUser = (username) => API.get(`/users?search=${username}`);

export const createChat = (userId) => API.post(`/chat`, { userId });

export const fetchUserChats = () => API.get(`/chat`);
