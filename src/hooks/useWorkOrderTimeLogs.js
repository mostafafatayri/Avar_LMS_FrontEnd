import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWorkOrderTimeLogs,
  getWorkOrderTimeLogSummary,
  createWorkOrderTimeLog,
  updateWorkOrderTimeLog,
  deleteWorkOrderTimeLog,
} from "../services/workOrderTimeLogService";

export const useWorkOrderTimeLogs = (workOrderId) => {
  return useQuery({
    queryKey: ["workOrderTimeLogs", workOrderId],
    queryFn: () => getWorkOrderTimeLogs(workOrderId),
    enabled: !!workOrderId,
  });
};

export const useWorkOrderTimeLogSummary = (workOrderId) => {
  return useQuery({
    queryKey: ["workOrderTimeLogSummary", workOrderId],
    queryFn: () => getWorkOrderTimeLogSummary(workOrderId),
    enabled: !!workOrderId,
  });
};

export const useCreateWorkOrderTimeLog = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createWorkOrderTimeLog(workOrderId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderTimeLogs", workOrderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["workOrderTimeLogSummary", workOrderId],
      });
    },
  });
};

export const useUpdateWorkOrderTimeLog = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ timeLogId, payload }) =>
      updateWorkOrderTimeLog(timeLogId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderTimeLogs", workOrderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["workOrderTimeLogSummary", workOrderId],
      });
    },
  });
};

export const useDeleteWorkOrderTimeLog = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (timeLogId) => deleteWorkOrderTimeLog(timeLogId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderTimeLogs", workOrderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["workOrderTimeLogSummary", workOrderId],
      });
    },
  });
};