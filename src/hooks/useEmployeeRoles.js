import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEmployeeRole,
  deleteEmployeeRole,
  getEmployeeRoles,
  setEmployeeRoleActive,
  setEmployeeRoleInactive,
  updateEmployeeRole,
} from "../services/employeeRoleService";

export function useEmployeeRoles() {
  return useQuery({
    queryKey: ["employeeRoles"],
    queryFn: getEmployeeRoles,
  });
}

export function useCreateEmployeeRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployeeRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeRoles"] });
    },
  });
}

export function useUpdateEmployeeRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployeeRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeRoles"] });
    },
  });
}

export function useSetEmployeeRoleActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setEmployeeRoleActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeRoles"] });
    },
  });
}

export function useSetEmployeeRoleInactive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setEmployeeRoleInactive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeRoles"] });
    },
  });
}

export function useDeleteEmployeeRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployeeRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeRoles"] });
    },
  });
}