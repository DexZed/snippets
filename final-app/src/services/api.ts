import axios from "axios";
import { useAuthContext } from "../contexts/context";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});
const apiTokenized = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

// Add interceptor to inject token from AuthContext
apiTokenized.interceptors.request.use(
  async (config) => {
    // Use `useAuthContext` to get the token
    const { token } = useAuthContext();

    try {
      // Resolve the computed token (since it's a signal)
      const resolvedToken = await token.value;

      if (resolvedToken) {
        config.headers.Authorization = `Bearer ${resolvedToken}`;
      }
    } catch (error) {
      console.error("Error resolving token:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, apiTokenized };
export default api;