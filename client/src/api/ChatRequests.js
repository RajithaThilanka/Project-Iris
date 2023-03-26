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

export const userChats = (id) => API.get(`/chat/${id}`);
export const updateSeen = (id) => API.patch(`/message/setSeen/${id}`);
export const updateSeenAll = (id) => API.patch(`/message/setSeenAll/${id}`);
export const fetchChatNotifications = () =>
  API.get(`/chat/fetch-chat-notifications`);
