import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWorkCategory,
  getWorkCategories,
} from "../services/workCategoryService";

export function useWorkCategories() {
  return useQuery({
    queryKey: ["work-categories"],
    queryFn: getWorkCategories,
  });
}

export function useCreateWorkCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["work-categories"],
      });
    },
  });
}