import { useQuery } from "@tanstack/react-query";
import { getMyOrganizations } from "../services/organizationsService";

export function useMyOrganizations() {
  return useQuery({
    queryKey: ["my-organizations"],
    queryFn: getMyOrganizations,
  });
}