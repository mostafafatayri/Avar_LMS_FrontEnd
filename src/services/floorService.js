import api from "../api/axiosInstance";

export const getFloors = async () => {
  const response = await api.get("/floors");
  return response.data;
};

export const createFloor = async (payload) => {
  const response = await api.post("/floors", payload);
  return response.data;
};

export const updateFloor = async (id, payload) => {
  const response = await api.put(`/floors/${id}`, payload);
  return response.data;
};

export const deleteFloor = async (id) => {
  const response = await api.delete(`/floors/${id}`);
  return response.data;
};