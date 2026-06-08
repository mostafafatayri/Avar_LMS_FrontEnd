import api from "../api/axiosInstance";

export const createWorkOrder = async (payload) => {
  const response = await api.post("/work-orders", payload);
  return response.data;
};

export const getWorkOrders = async () => {
  const response = await api.get("/work-orders");
  return response.data;
};

export const closeWorkOrder = async (workOrderId, payload) => {
  const response = await api.put(`/work-orders/${workOrderId}/close`, payload);
  return response.data;
};


export const getWorkOrderById = async (workOrderId) => {
  const response = await api.get(`/work-orders/${workOrderId}`);
  return response.data;
};



export const getWorkOrderComments = async (workOrderId) => {
  const response = await api.get(`/work-orders/${workOrderId}/comments`);
  return response.data;
};

export const addWorkOrderComment = async (workOrderId, payload) => {
  const response = await api.post(`/work-orders/${workOrderId}/comments`, payload);
  return response.data;
};
///
export const updateWorkOrderComment = async (commentId, payload) => {
  const response = await api.put(`/work-orders/comments/${commentId}`, payload);
  return response.data;
};

export const deleteWorkOrderComment = async (commentId) => {
  const response = await api.delete(`/work-orders/comments/${commentId}`);
  return response.data;
};

export const getTasksByWorkOrderId = async (workOrderId) => {
  const response = await api.get(`/work-order-tasks/work-order/${workOrderId}`);
  return response.data;
};

export const createWorkOrderTask = async (payload) => {
  const response = await api.post("/work-order-tasks", payload);
  return response.data;
};

export const updateWorkOrderTask = async (taskId, payload) => {
  const response = await api.put(`/work-order-tasks/${taskId}`, payload);
  return response.data;
};

export const deleteWorkOrderTask = async (taskId) => {
  const response = await api.delete(`/work-order-tasks/${taskId}`);
  return response.data;
};

// for the questions to appear:
export const getChecklistTemplateByScope = async (scope) => {
  const response = await api.get(
    `/checklists/templates/scope/${scope}`
  );

  return response.data;
};


export const assignWorkOrderEmployee = async (
  workOrderId,
  employeeId,
  roleOnWorkOrder = "PRIMARY"
) => {
  const response = await api.patch(`/work-orders/${workOrderId}/assign`, {
    employeeId,
    roleOnWorkOrder,
  });

  return response.data;
};

export const getWorkOrderAssignments = async (workOrderId) => {
  const response = await api.get(`/work-orders/${workOrderId}/assignments`);
  return response.data;
};

export const removeWorkOrderAssignment = async (assignmentId) => {
  const response = await api.patch(
    `/work-orders/assignments/${assignmentId}/remove`
  );

  return response.data;
};