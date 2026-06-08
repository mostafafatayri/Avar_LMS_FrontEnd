import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTasksByWorkOrderId,
  createWorkOrderTask,
  updateWorkOrderTask,
  deleteWorkOrderTask,
} from "../services/workOrderService";
import { getCurrentEmployeeId } from "../services/authService";

export const useWorkOrderTasks = (workOrderId) => {
  return useQuery({
    queryKey: ["workOrderTasks", workOrderId],
    queryFn: () => getTasksByWorkOrderId(workOrderId),
    enabled: !!workOrderId,
  });
};

export const useCreateWorkOrderTask = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData) =>
      createWorkOrderTask({
        ...taskData,
        workOrderId: Number(workOrderId),
        assignedEmployeeId: Number(taskData.assignedEmployeeId || getCurrentEmployeeId() || 1),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderTasks", workOrderId],
      });
    },
  });
};

export const useUpdateWorkOrderTask = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }) => updateWorkOrderTask(taskId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderTasks", workOrderId],
      });
    },
  });
};

export const useDeleteWorkOrderTask = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId) => deleteWorkOrderTask(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderTasks", workOrderId],
      });
    },
  });
};