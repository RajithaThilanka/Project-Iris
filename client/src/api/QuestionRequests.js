import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });

//export const getAllQuestions = () => API.get(`/questions/`);
export const getQuestionArray = () => API.get(`/questions/`);
//export const getQuestionById = (id) => API.get(`/question/question/${id}`);

