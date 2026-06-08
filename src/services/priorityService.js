import api from "../api/axiosInstance";

export const getPriorities = async () => {
  const response = await api.get("/priorities");
  return response.data;
};

export const createPriority = async (payload) => {
  const response = await api.post("/priorities", payload);
  return response.data;
};