import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
});

api.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

export * from "./auth";
export * from "./users";
