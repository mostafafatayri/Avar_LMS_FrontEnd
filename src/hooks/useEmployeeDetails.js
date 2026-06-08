import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../services/employeeService";

export function useEmployeeDetails(id) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: Boolean(id),
  });
}