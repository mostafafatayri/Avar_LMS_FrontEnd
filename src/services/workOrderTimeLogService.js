import api from "../api/axiosInstance";

export const getWorkOrderTimeLogs = async (workOrderId) => {
  const response = await api.get(`/work-orders/${workOrderId}/time-logs`);
  return response.data;
};

export const getWorkOrderTimeLogSummary = async (workOrderId) => {
  const response = await api.get(`/work-orders/${workOrderId}/time-logs/summary`);
  return response.data;
};

export const createWorkOrderTimeLog = async (workOrderId, payload) => {
  const response = await api.post(`/work-orders/${workOrderId}/time-logs`, payload);
  return response.data;
};

export const updateWorkOrderTimeLog = async (timeLogId, payload) => {
  const response = await api.put(`/time-logs/${timeLogId}`, payload);
  return response.data;
};

export const deleteWorkOrderTimeLog = async (timeLogId) => {
  const response = await api.delete(`/time-logs/${timeLogId}`);
  return response.data;
};