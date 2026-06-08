import api from "../api/axiosInstance";

export const getBuildings = async () => {
  const response = await api.get("/buildings");
  return response.data;
};

export const createBuilding = async (payload) => {
  const response = await api.post("/buildings", payload);
  return response.data;
};