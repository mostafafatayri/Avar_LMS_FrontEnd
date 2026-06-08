import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUploadDepartments } from "../services/departmentService";

export function useBulkUploadDepartments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUploadDepartments,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });
}