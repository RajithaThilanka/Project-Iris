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

export const getMatches = () => API.get("/users/me/suggestions/ai");
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

export const searchUser = (username) =>
  API.get(`/users/con?search=${username}`);

export const createChat = (userId) => API.post(`/chat`, { userId });
export const deleteChat = (id) => API.delete(`/chat/delete-chat/${id}`);
export const accessDateChat = (dateId) =>
  API.get(`/users/me/dates/chat`, { dateId });

export const fetchUserChats = () => API.get(`/chat`);

export const fetchDateChats = (dateId) =>
  API.get(`/users/me/dates/chat/fetch`, { dateId });

export const createGroup = (name, users) =>
  API.post(`/chat/group`, {
    name,
    users,
  });

export const renameGroup = (chatId, chatName) =>
  API.patch("/chat/rename", { chatId, chatName });

export const adduser = (chatId, userId) =>
  API.patch(`/chat/groupadd`, {
    chatId,
    userId,
  });

export const removeUser = (chatId, userId) =>
  API.patch(`/chat/groupremove`, {
    chatId,
    userId,
  });

export const sendAMessage = (content, chatId) =>
  API.post(`/message`, {
    content,
    chatId,
  });

export const sendADateMessage = (content, chatId) =>
  API.post(`/users/me/dates/chat/message`, { content, chatId });

export const getAllMessages = (chatId) => API.get(`/message/${chatId}`);

export const getAllDateMessages = (chatId) =>
  API.get(`/users/me/dates/chat/message`, { chatId });

export const getMe = () => API.get("/users/me");

export const removeFriend = (id) => API.patch(`/users/me/friends/remove/${id}`);

export const postponeDate = (id, scheduledAt) =>
  API.patch(`/users/me/dates/postpone/${id}`, { scheduledAt });

export const fetchWarnings = () => API.get("/report/fetch-warnings");

export const reportUser = (data) => API.post("/report", data);

export const setNotified = (id) => API.patch("/report/notified", { id });

export const getMyVerStatus = () => API.get("/users/me/ver-status");
//export const Camara = () => API.get("/")

export const getSearchNames = (keyword) =>
  API.get(`/users/names?search=${keyword}`);
export const getAnyUser = (keyword) => API.get(`/users?search=${keyword}`);
export const getSearchTokens = () => API.get(`/users/search-tokens`);

export const getTagSuggestions = (tag) =>
  API.patch("/users/me/tag-suggestions", { tag: tag });

export const blockUser = (id) => API.patch("/users/me/block", { id });
