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
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export default api;
