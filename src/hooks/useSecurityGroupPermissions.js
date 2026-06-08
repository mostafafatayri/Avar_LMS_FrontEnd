import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPermissionToSecurityGroup,
  getAvailablePermissionsForSecurityGroup,
  removePermissionFromSecurityGroup,
} from "../services/securityGroupService";

export function useAvailablePermissionsForSecurityGroup(groupId) {
  return useQuery({
    queryKey: ["security-group-available-permissions", groupId],
    queryFn: () => getAvailablePermissionsForSecurityGroup(groupId),
    enabled: !!groupId,
  });
}

export function useAddPermissionToSecurityGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPermissionToSecurityGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["security-group", String(variables.groupId)],
      });

      queryClient.invalidateQueries({
        queryKey: ["security-group-available-permissions", variables.groupId],
      });
    },
  });
}

export function useRemovePermissionFromSecurityGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removePermissionFromSecurityGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["security-group", String(variables.groupId)],
      });

      queryClient.invalidateQueries({
        queryKey: ["security-group-available-permissions", variables.groupId],
      });
    },
  });
}