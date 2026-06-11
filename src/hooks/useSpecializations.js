import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSpecialization,
  deleteSpecialization,
  getSpecializations,
  setSpecializationActive,
  setSpecializationInactive,
  updateSpecialization,
} from "../services/specializationService";

export function useSpecializations() {
  return useQuery({
    queryKey: ["specializations"],
    queryFn: getSpecializations,
  });
}

export function useCreateSpecialization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSpecialization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
    },
  });
}

export function useUpdateSpecialization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSpecialization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
    },
  });
}

export function useSetSpecializationActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setSpecializationActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
    },
  });
}

export function useSetSpecializationInactive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setSpecializationInactive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
    },
  });
}

export function useDeleteSpecialization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSpecialization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specializations"] });
    },
  });
}