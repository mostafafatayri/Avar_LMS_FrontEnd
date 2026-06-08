import { useQuery } from "@tanstack/react-query";
import { getSecurityGroupById } from "../services/securityGroupService";

export const useSecurityGroupDetails = (id) => {
  return useQuery({
    queryKey: ["security-group", id],
    queryFn: () => getSecurityGroupById(id),
    enabled: !!id,
  });
};