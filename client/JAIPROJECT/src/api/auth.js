// import axios from "axios";

// const API = axios.create({ baseURL: "https://fullproject-9.onrender.com/api/auth" });muje

// export const register = (data) => API.post("/register", data).then(res => res.data);
// export const login = (data) => API.post("/login", data).then(res => res.data);





//after deploy

// import axios from "axios";

// // Backend ka base URL
// const API_URL = "https://fullproject-9.onrender.com/api/auth";

// const API = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// // Register
// export const register = async (data) => {
//   const res = await API.post("/register", data);
//   return res.data;
// };

// // Login
// export const login = async (data) => {
//   const res = await API.post("/login", data);
//   return res.data;
// };










import axios from "axios";

// Backend ka base URL
const API_URL = "https://api.airobotsmarketplace.in/api/auth";

// Axios instance
const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically to requests if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Register
export const register = async (data) => {
  const res = await API.post("/register", data);
  return res.data;
};

// Login
export const login = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};

// Get user profile (example)
export const getProfile = async () => {
  const res = await API.get("/me");
  return res.data;
};
