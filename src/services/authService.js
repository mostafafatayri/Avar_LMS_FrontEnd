import api from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";
const CURRENT_USER_KEY = "currentUser";

let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || null;

const buildCurrentUserFromToken = (token) => {
  if (!token) return null;

  const decoded = jwtDecode(token);

  return {
    userId: decoded.userId ?? null,
    employeeId: decoded.employeeId ?? null,

    username: decoded.username ?? "",
    email: decoded.sub ?? decoded.email ?? "",

    fullName: decoded.fullName ?? "",

    departmentId: decoded.departmentId ?? null,
    departmentName: decoded.departmentName ?? "",

    positionId: decoded.positionId ?? null,
    positionName: decoded.positionName ?? "",

    roles: decoded.roles ?? decoded.authorities ?? [],
  };
};

export const setAccessToken = (token) => {
  accessToken = token;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);

  const currentUser = buildCurrentUserFromToken(token);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
};

export const getAccessToken = () => {
  return accessToken || localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const getCurrentUserId = () => {
  return getCurrentUser()?.userId ?? null;
};

export const getCurrentEmployeeId = () => {
  return getCurrentUser()?.employeeId ?? null;
};

export const getCurrentFullName = () => {
  return getCurrentUser()?.fullName ?? "";
};

export const getCurrentUsername = () => {
  return getCurrentUser()?.username ?? "";
};

export const getCurrentEmail = () => {
  return getCurrentUser()?.email ?? "";
};

export const getCurrentDepartmentId = () => {
  return getCurrentUser()?.departmentId ?? null;
};

export const getCurrentDepartmentName = () => {
  return getCurrentUser()?.departmentName ?? "";
};

export const getCurrentPositionId = () => {
  return getCurrentUser()?.positionId ?? null;
};

export const getCurrentPositionName = () => {
  return getCurrentUser()?.positionName ?? "";
};

export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const login = async (identifier, password) => {
  const response = await api.post(
    "/auth/login",
    { identifier, password },
    { withCredentials: true }
  );

  setAccessToken(response.data.accessToken);
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await api.post(
    "/auth/refresh",
    {},
    { withCredentials: true }
  );

  setAccessToken(response.data.accessToken);
  return response.data.accessToken;
};

export const signup = async (payload) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};

export const logout = () => {
  clearAccessToken();
};