import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTerritories,
  deactivateTerritory,
  reactivateTerritory,
  createTerritory
} from "../services/territoryService";


export function useTerritories() {
  return useQuery({
    queryKey: ["territories"],
    queryFn: getTerritories,
  });
}

export function useDeactivateTerritory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateTerritory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["territories"],
      });
    },
  });
}


export function useReactivateTerritory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reactivateTerritory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["territories"],
      });
    },
  });
}



export function useCreateTerritory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTerritory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["territories"],
      });
    },
  });
}