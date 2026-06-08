import { useQuery } from "@tanstack/react-query";
import { getWorkOrderAssignments } from "../services/workOrderService";

export function useWorkOrderAssignments(workOrderId) {
  return useQuery({
    queryKey: ["workOrderAssignments", workOrderId],
    queryFn: () => getWorkOrderAssignments(workOrderId),
    enabled: !!workOrderId,
  });
}