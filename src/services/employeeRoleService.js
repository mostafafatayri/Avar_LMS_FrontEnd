import api from "../api/axiosInstance";

export const getEmployeeRoles = async () => {
  const response = await api.get("/employee-roles");
  return response.data;
};

export const getEmployeeRoleById = async (id) => {
  const response = await api.get(`/employee-roles/${id}`);
  return response.data;
};

export const createEmployeeRole = async (payload) => {
  const response = await api.post("/employee-roles", payload);
  return response.data;
};

export const updateEmployeeRole = async ({ id, payload }) => {
  const response = await api.put(`/employee-roles/${id}`, payload);
  return response.data;
};

export const setEmployeeRoleActive = async (id) => {
  const response = await api.patch(`/employee-roles/${id}/active`);
  return response.data;
};

export const setEmployeeRoleInactive = async (id) => {
  const response = await api.patch(`/employee-roles/${id}/inactive`);
  return response.data;
};

export const deleteEmployeeRole = async (id) => {
  const response = await api.delete(`/employee-roles/${id}`);
  return response.data;
};