import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWorkOrderComments,
  addWorkOrderComment,
  updateWorkOrderComment,
  deleteWorkOrderComment,
} from "../services/workOrderService";
import {getCurrentEmployeeId} from "../services/authService"

export const useWorkOrderComments = (workOrderId) => {
  return useQuery({
    queryKey: ["workOrderComments", workOrderId],
    queryFn: () => getWorkOrderComments(workOrderId),
    enabled: !!workOrderId,
  });
};

export const useAddWorkOrderComment = (workOrderId) => {
  const queryClient = useQueryClient();
console.log("the user is : "+getCurrentEmployeeId())
  return useMutation({
    mutationFn: (commentText) =>
      addWorkOrderComment(workOrderId, {
        commentText,
        employeeId: getCurrentEmployeeId(),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderComments", workOrderId],
      });
    },
  });
};

export const useUpdateWorkOrderComment = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, commentText }) =>
      updateWorkOrderComment(commentId, { commentText }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderComments", workOrderId],
      });
    },
  });
};

export const useDeleteWorkOrderComment = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteWorkOrderComment(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderComments", workOrderId],
      });
    },
  });
};