import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUploadTerritories } from "../services/territoryService";

export function useBulkUploadTerritories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUploadTerritories,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["territories"],
      });
    },
  });
}