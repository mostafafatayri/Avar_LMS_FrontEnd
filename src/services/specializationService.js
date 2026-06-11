import api from "../api/axiosInstance";

export const getSpecializations = async () => {
  const response = await api.get("/specializations");
  return response.data;
};

export const getSpecializationById = async (id) => {
  const response = await api.get(`/specializations/${id}`);
  return response.data;
};

export const createSpecialization = async (payload) => {
  const response = await api.post("/specializations", payload);
  return response.data;
};

export const updateSpecialization = async ({ id, payload }) => {
  const response = await api.put(`/specializations/${id}`, payload);
  return response.data;
};

export const setSpecializationActive = async (id) => {
  const response = await api.patch(`/specializations/${id}/active`);
  return response.data;
};

export const setSpecializationInactive = async (id) => {
  const response = await api.patch(`/specializations/${id}/inactive`);
  return response.data;
};

export const deleteSpecialization = async (id) => {
  const response = await api.delete(`/specializations/${id}`);
  return response.data;
};