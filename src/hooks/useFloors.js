import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFloor,
  deleteFloor,
  getFloors,
  updateFloor,
} from "../services/floorService";

export function useFloors() {
  return useQuery({
    queryKey: ["floors"],
    queryFn: getFloors,
  });
}

export function useCreateFloor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFloor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floors"] });
    },
  });
}

export function useUpdateFloor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateFloor(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floors"] });
    },
  });
}

export function useDeleteFloor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFloor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floors"] });
    },
  });
}