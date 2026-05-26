import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const Storage_Key = "userAuth";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    try {
      const storedAuth = localStorage.getItem(Storage_Key);

      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);

        if (parsedAuth && parsedAuth.token) {
          config.headers.Authorization = `Bearer ${parsedAuth.token}`;
        }
      }
    } catch (error) {
      console.error("Failed to parse auth token from localStorage", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
