import api from "../api/axiosInstance";

export const getTerritories = async () => {
  const response = await api.get("/territories");
  return response.data;
};

export const createTerritory = async (payload) => {
  const response = await api.post("/territories", payload);
  return response.data;
};

export const updateTerritory = async ({ id, payload }) => {
  const response = await api.put(`/territories/${id}`, payload);
  return response.data;
};

export const deleteTerritory = async (id) => {
  const response = await api.delete(`/territories/${id}`);
  return response.data;
};

export const bulkUploadTerritories = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/territories/bulk-upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deactivateTerritory = async (id) => {
  const response = await api.patch(`/territories/${id}/deactivate`);
  return response.data;
};

export const reactivateTerritory = async (id) => {
  const response = await api.patch(`/territories/${id}/reactivate`);
  return response.data;
};