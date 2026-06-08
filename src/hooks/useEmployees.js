import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEmployee,
  getEmployees,
  updateEmployee,
  inviteEmployee,
} from "../services/employeeService";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateEmployee(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", variables.id] });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}

export function useInviteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}