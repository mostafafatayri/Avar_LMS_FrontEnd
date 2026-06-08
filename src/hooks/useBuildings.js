import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBuilding, getBuildings } from "../services/buildingService";

export function useBuildings() {
  return useQuery({
    queryKey: ["buildings"],
    queryFn: getBuildings,
  });
}

export function useCreateBuilding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBuilding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["buildings"],
      });
    },
  });
}