import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUploadPositions } from "../services/positionService";

export function useBulkUploadPositions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUploadPositions,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["positions"],
      });
    },
  });
}