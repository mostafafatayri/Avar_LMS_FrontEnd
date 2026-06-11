import api from "../api/axiosInstance";

export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

export const createDepartment = async (payload) => {
  const response = await api.post("/departments", payload);
  return response.data;
};


export const getDepartmentById = async (id) => {
  const response = await api.get(`/departments/${id}`);
  return response.data;
};

export const updateDepartment = async ({ id, payload }) => {
  const response = await api.put(`/departments/${id}`, payload);
  return response.data;
};

export const setDepartmentInactive = async (id) => {
  const response = await api.patch(`/departments/${id}/inactive`);
  return response.data;
};

export const setDepartmentActive = async (id) => {
  const response = await api.patch(`/departments/${id}/active`);
  return response.data;
};


export const bulkUploadDepartments = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/departments/bulk-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};