import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPosition,
  getPositions,
  setPositionActive,
  setPositionInactive,
  updatePosition,
} from "../services/positionService";

export function usePositions() {
  return useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  });
}

export function useCreatePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
}

export function useUpdatePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
}

export function useSetPositionInactive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPositionInactive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
}

export function useSetPositionActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPositionActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
}