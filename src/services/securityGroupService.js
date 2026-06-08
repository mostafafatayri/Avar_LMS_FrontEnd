import api from "../api/axiosInstance";

export const getSecurityGroups = async () => {
  const response = await api.get("/security-groups");
  return response.data;
};


export const getSecurityGroupById = async (id) => {
  const response = await api.get(`/security-groups/${id}`);
  return response.data;
};

export const getAvailableUsersForSecurityGroup = async (groupId) => {
  const response = await api.get(`/security-groups/${groupId}/available-users`);
  return response.data;
};

export const addUserToSecurityGroup = async ({ groupId, userId }) => {
  const response = await api.post(`/security-groups/${groupId}/users/${userId}`);
  return response.data;
};

export const removeUserFromSecurityGroup = async ({ groupId, userId }) => {
  const response = await api.delete(`/security-groups/${groupId}/users/${userId}`);
  return response.data;
};


//
export const getAvailablePermissionsForSecurityGroup = async (groupId) => {
  const response = await api.get(
    `/security-groups/${groupId}/available-permissions`
  );
  return response.data;
};

export const addPermissionToSecurityGroup = async ({
  groupId,
  permissionId,
}) => {
  const response = await api.post(
    `/security-groups/${groupId}/permissions/${permissionId}`
  );
  return response.data;
};

export const removePermissionFromSecurityGroup = async ({
  groupId,
  permissionId,
}) => {
  const response = await api.delete(
    `/security-groups/${groupId}/permissions/${permissionId}`
  );
  return response.data;
};