import api from "../api/axiosInstance";

export const createChecklistTemplate = async (payload) => {
  const response = await api.post("/checklists/templates", payload);
  return response.data;
};

export const getChecklistTemplates = async () => {
  const response = await api.get("/checklists/templates");
  return response.data;
};

export const getChecklistTemplateById = async (templateId) => {
  const response = await api.get(`/checklists/templates/${templateId}`);
  return response.data;
};

export const getChecklistTemplateByScope = async (scope) => {
  const response = await api.get(`/checklists/templates/scope/${scope}`);
  return response.data;
};

export const getChecklistQuestionsByTemplate = async (templateId) => {
  const response = await api.get(`/checklists/templates/${templateId}/questions`);
  console.log("the list of questionsa are "+JSON.stringify(response))
  return response.data;
};

export const createChecklistQuestion = async (payload) => {
  const response = await api.post("/checklists/questions", payload);
  return response.data;
};

export const updateChecklistQuestion = async (id, payload) => {
  const response = await api.put(`/checklists/questions/${id}`, payload);
  return response.data;
};

export const deleteChecklistQuestion = async (id) => {
  const response = await api.delete(`/checklists/questions/${id}`);
  return response.data;
};