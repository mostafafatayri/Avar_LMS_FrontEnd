import api from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";
const CURRENT_USER_KEY = "currentUser";

const SELECTED_ORG_ID_KEY = "selectedOrganizationId";
const SELECTED_ORG_NAME_KEY = "selectedOrganizationName";
const SELECTED_ORG_CODE_KEY = "selectedOrganizationCode";

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

export const getCurrentUserId = () => getCurrentUser()?.userId ?? null;
export const getCurrentEmployeeId = () => getCurrentUser()?.employeeId ?? null;
export const getCurrentFullName = () => getCurrentUser()?.fullName ?? "";
export const getCurrentUsername = () => getCurrentUser()?.username ?? "";
export const getCurrentEmail = () => getCurrentUser()?.email ?? "";
export const getCurrentDepartmentId = () => getCurrentUser()?.departmentId ?? null;
export const getCurrentDepartmentName = () => getCurrentUser()?.departmentName ?? "";
export const getCurrentPositionId = () => getCurrentUser()?.positionId ?? null;
export const getCurrentPositionName = () => getCurrentUser()?.positionName ?? "";

export const setSelectedOrganization = (organization) => {
  localStorage.setItem(SELECTED_ORG_ID_KEY, organization.id);
  localStorage.setItem(SELECTED_ORG_NAME_KEY, organization.name);
  localStorage.setItem(SELECTED_ORG_CODE_KEY, organization.code || "");
};

export const getSelectedOrganizationId = () => {
  return localStorage.getItem(SELECTED_ORG_ID_KEY);
};

export const getSelectedOrganizationName = () => {
  return localStorage.getItem(SELECTED_ORG_NAME_KEY) || "";
};

export const getSelectedOrganizationCode = () => {
  return localStorage.getItem(SELECTED_ORG_CODE_KEY) || "";
};

export const clearSelectedOrganization = () => {
  localStorage.removeItem(SELECTED_ORG_ID_KEY);
  localStorage.removeItem(SELECTED_ORG_NAME_KEY);
  localStorage.removeItem(SELECTED_ORG_CODE_KEY);
};

export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  clearSelectedOrganization();
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




//
// 14/7/--->b3bdaaa  beirut kadii