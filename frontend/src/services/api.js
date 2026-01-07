import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

const clientAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default clientAPI;
