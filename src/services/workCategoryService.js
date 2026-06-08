import api from "../api/axiosInstance";

export const getWorkCategories = async () => {
  const response = await api.get("/work-categories");
  return response.data;
};

export const createWorkCategory = async (payload) => {
  const response = await api.post("/work-categories", payload);
  return response.data;
};