import api from "../api/axiosInstance";

export const uploadAttachment = async (
  file,
  entityType,
  entityId,
  attachmentType
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("entityType", entityType);
  formData.append("entityId", entityId);
  formData.append("attachmentType", attachmentType);

  const response = await api.post("/attachments/upload", formData);

  return response.data;
};

/// added new :
export const getAttachmentsByEntity = async (entityType, entityId) => {
  const response = await api.get(`/attachments/entity/${entityType}/${entityId}`);
  return response.data;
};

export const deleteAttachment = async (attachmentId) => {
  const response = await api.delete(`/attachments/${attachmentId}`);
  return response.data;
};