import axios from "axios";
import { getAccessToken, refreshAccessToken } from "../services/authService";

const api = axios.create({
  baseURL: "http://localhost:9090/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    error ? promise.reject(error) : promise.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const selectedOrganizationId = localStorage.getItem("selectedOrganizationId");

  if (selectedOrganizationId) {
    config.headers["X-Organization-Id"] = selectedOrganizationId;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        const selectedOrganizationId = localStorage.getItem(
          "selectedOrganizationId"
        );

        if (selectedOrganizationId) {
          originalRequest.headers["X-Organization-Id"] = selectedOrganizationId;
        }

        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;