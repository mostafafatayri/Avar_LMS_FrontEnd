import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWorkType, getWorkTypes } from "../services/workTypeService";

export function useWorkTypes() {
  return useQuery({
    queryKey: ["work-types"],
    queryFn: getWorkTypes,
  });
}

export function useCreateWorkType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["work-types"],
      });
    },
  });
}