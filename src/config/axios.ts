import axios from "axios";

// Base axios instance
const api = axios.create({
//   baseURL: "https://proactive-be-production.up.railway.app",
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
