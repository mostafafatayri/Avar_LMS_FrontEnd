import api from "../api/axiosInstance";

export const getWorkOrderSummary = async () => {
  const response = await api.get("/dashboard/work-orders/summary");
  return response.data;
};