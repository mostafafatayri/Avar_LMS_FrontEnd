import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrganization } from "../services/organizationsService";

export function useUpdateOrganization(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateOrganization(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization", id] });
      queryClient.invalidateQueries({ queryKey: ["my-organizations"] });
    },
  });
}