import axios from "axios";
import { useAuthStore } from "@/features/auth/store/authStore";

const api = axios.create({
  // In dev, empty baseURL uses Vite proxy → http://127.0.0.1:5000
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const isLoginRequest = config.url?.includes("/auth/superadmin/login");

  if (token && !isLoginRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/auth/superadmin/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default api;
