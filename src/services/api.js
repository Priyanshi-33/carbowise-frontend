// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // automatically points to deployed backend
  withCredentials: true, // send cookies for auth
});

export default api;



