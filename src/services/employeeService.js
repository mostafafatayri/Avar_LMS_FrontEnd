import api from "../api/axiosInstance";

export const getEmployees = async () => {
  const response = await api.get("/employees");

  return response.data.map((employee) => ({
    id: employee.id,
    employeeId: employee.employeeId || `EMP-${String(employee.id).padStart(4, "0")}`,
    fullName: employee.fullName || "-",
    email: employee.email || "-",
    department: employee.departmentName || "-",
    jobTitle: employee.positionName || "-",
    status: employee.active ? "ACTIVE" : "INACTIVE",

    firstName: employee.firstName,
    middleName: employee.middleName,
    lastName: employee.lastName,
    departmentId: employee.departmentId,
    positionId: employee.positionId,
    phoneNumber: employee.phoneNumber,
    appUserId: employee.appUserId,
    username: employee.username,
  }));
};

export const createEmployee = async (payload) => {
  const response = await api.post("/employees", payload);
  return response.data;
};

export const updateEmployee = async (id, payload) => {
  const response = await api.put(`/employees/${id}`, payload);
  return response.data;
};

export const inviteEmployee = async (employeeId) => {
  const response = await api.post(`/employees/${employeeId}/invite`);
  return response.data;
};

export const setEmployeeInactive = async (id) => {
  const response = await api.patch(`/employees/${id}/inactive`);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

export const linkEmployeeToUser = async (employeeId, username) => {
  const response = await api.patch(`/employees/${employeeId}/link-user`, {
    username,
  });

  return response.data;
};

export const unlinkEmployeeUser = async (employeeId) => {
  const response = await api.patch(`/employees/${employeeId}/unlink-user`);
  return response.data;
};

export const getMyManagedEmployees = async (managerId) => {
  const response = await api.get(`/employees/manager/${managerId}/team`);
  return response.data;
};

export const bulkUploadEmployees = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/employees/bulk-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};