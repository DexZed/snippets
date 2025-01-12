import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`, // Base URL for API
  withCredentials: true, // Include cookies in requests
});

export default api;
