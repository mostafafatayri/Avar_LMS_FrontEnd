import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  setDepartmentInactive,
  setDepartmentActive,
} from "../services/departmentService";

export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

export function useSetDepartmentInactive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDepartmentInactive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

export function useSetDepartmentActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setDepartmentActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}