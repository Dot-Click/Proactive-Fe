import axios from "axios";

// Base axios instance
const api = axios.create({
  baseURL: "https://proactive-be-production.up.railway.app",
  // baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // If data is FormData, remove Content-Type header so axios can set it automatically with boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});
export default api;
