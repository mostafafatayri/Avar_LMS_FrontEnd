import { useQuery } from "@tanstack/react-query";
import { getSecurityGroups } from "../services/securityGroupService";

export const useSecurityGroups = () => {
  return useQuery({
    queryKey: ["security-groups"],
    queryFn: getSecurityGroups,
  });
};