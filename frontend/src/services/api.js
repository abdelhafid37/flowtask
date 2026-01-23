import { logout } from "@/lib/auth";
import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5001/api";

const clientAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

clientAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default clientAPI;
