import axios from "axios";

const API = axios.create({
  baseURL: "https://fullproject-fnbv.onrender.com/api",
});

// ✅ Automatically add token in every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
