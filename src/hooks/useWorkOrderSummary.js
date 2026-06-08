
import { useQuery } from "@tanstack/react-query";
import { getWorkOrderSummary } from "../services/WorkOrderdashboardService";

export const useWorkOrderSummary = () => {
  return useQuery({
    queryKey: ["workOrderSummary"],
    queryFn: getWorkOrderSummary,
    staleTime: 60 * 1000,
    retry: 1,
  });
};