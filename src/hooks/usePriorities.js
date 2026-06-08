import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPriority, getPriorities } from "../services/priorityService";

export function usePriorities() {
  return useQuery({
    queryKey: ["priorities"],
    queryFn: getPriorities,
  });
}

export function useCreatePriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPriority,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["priorities"],
      });
    },
  });
}