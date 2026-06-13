import api from "../api/axiosInstance";

export async function getMyOrganizations() {
  const response = await api.get("/organizations/my");
  return response.data;
}

export async function getOrganizationById(id) {
  const response = await api.get(`/organizations/${id}`);
  return response.data;
}

export async function createOrganization(payload) {
  const response = await api.post("/organizations", payload);
  return response.data;
}

export async function updateOrganization(id, payload) {
  const response = await api.put(`/organizations/${id}`, payload);
  return response.data;
}

export async function getOrganizationDomain(id) {
  const response = await api.get(`/organizations/${id}/domain`);
  return response.data;
}

export async function attachOrganizationDomain(id, payload) {
  const response = await api.put(`/organizations/${id}/domain`, payload);
  return response.data;
}

export async function removeOrganizationDomain(id) {
  const response = await api.delete(`/organizations/${id}/domain`);
  return response.data;
}

export async function getOrganizationDomainUsers(id) {
  const response = await api.get(`/organizations/${id}/domain-users`);
  return response.data;
}

export async function getOrganizationAdmins(id) {
  const response = await api.get(`/organizations/${id}/admins`);
  return response.data;
}