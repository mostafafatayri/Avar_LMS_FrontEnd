import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAttachmentsByEntity, uploadAttachment, deleteAttachment,} from "../services/attachmentService";

export const useWorkOrderAttachments = (workOrderId) => {
  return useQuery({
    queryKey: ["workOrderAttachments", workOrderId],
    queryFn: () => getAttachmentsByEntity("WORK_ORDER", workOrderId),
    enabled: !!workOrderId,
  });
};

/// new :
export const useUploadWorkOrderAttachment = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) =>
      uploadAttachment(
        file,
        "WORK_ORDER",
        workOrderId,
        "WORK_ORDER_ATTACHMENT"
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderAttachments", workOrderId],
      });
    },
  });
};

export const useDeleteWorkOrderAttachment = (workOrderId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attachmentId) => deleteAttachment(attachmentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workOrderAttachments", workOrderId],
      });
    },
  });
};