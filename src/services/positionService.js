import api from "../api/axiosInstance";

export const getPositions = async () => {
  const response = await api.get("/positions");
  return response.data;
};

export const getPositionById = async (id) => {
  const response = await api.get(`/positions/${id}`);
  return response.data;
};

export const createPosition = async (payload) => {
  const response = await api.post("/positions", payload);
  return response.data;
};

export const updatePosition = async ({ id, payload }) => {
  const response = await api.put(`/positions/${id}`, payload);
  return response.data;
};

export const setPositionInactive = async (id) => {
  const response = await api.patch(`/positions/${id}/inactive`);
  return response.data;
};

export const setPositionActive = async (id) => {
  const response = await api.patch(`/positions/${id}/active`);
  return response.data;
};

export const bulkUploadPositions = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/positions/bulk-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};