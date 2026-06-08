import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUploadEmployees } from "../services/employeeService";

export function useBulkUploadEmployees() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUploadEmployees,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
}