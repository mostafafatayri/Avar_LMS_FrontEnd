import api from "../api/axiosInstance";

export const getSubTeams = async () => {
  const response = await api.get("/sub-teams");
  return response.data;
};

export const getSubTeamById = async (id) => {
  const response = await api.get(`/sub-teams/${id}`);
  return response.data;
};

export const createSubTeam = async (payload) => {
  const response = await api.post("/sub-teams", payload);
  return response.data;
};

export const updateSubTeam = async ({ id, payload }) => {
  const response = await api.put(`/sub-teams/${id}`, payload);
  return response.data;
};

export const setSubTeamActive = async (id) => {
  const response = await api.patch(`/sub-teams/${id}/active`);
  return response.data;
};

export const setSubTeamInactive = async (id) => {
  const response = await api.patch(`/sub-teams/${id}/inactive`);
  return response.data;
};

export const deleteSubTeam = async (id) => {
  const response = await api.delete(`/sub-teams/${id}`);
  return response.data;
};