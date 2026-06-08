import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUserToSecurityGroup,
  getAvailableUsersForSecurityGroup,
  removeUserFromSecurityGroup,
} from "../services/securityGroupService";

export function useAvailableUsersForSecurityGroup(groupId, enabled) {
  return useQuery({
    queryKey: ["security-group-available-users", groupId],
    queryFn: () => getAvailableUsersForSecurityGroup(groupId),
    enabled: !!groupId && enabled,
  });
}

export function useAddUserToSecurityGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserToSecurityGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["security-group", String(variables.groupId)]);
      queryClient.invalidateQueries(["security-group-available-users", variables.groupId]);
    },
  });
}

export function useRemoveUserFromSecurityGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeUserFromSecurityGroup,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["security-group", String(variables.groupId)]);
      queryClient.invalidateQueries(["security-group-available-users", variables.groupId]);
    },
  });
}