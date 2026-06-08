import api from "../api/axiosInstance";

export const getWorkTypes = async () => {
  const response = await api.get("/work-types");
  return response.data;
};

export const createWorkType = async (payload) => {
  const response = await api.post("/work-types", payload);
  return response.data;
};