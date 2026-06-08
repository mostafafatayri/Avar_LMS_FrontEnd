// src/services/nationalityService.js
import api from "../api/axiosInstance";

export const getNationalities = async () => {
  const response = await api.get("/nationalities");
  return response.data;
};