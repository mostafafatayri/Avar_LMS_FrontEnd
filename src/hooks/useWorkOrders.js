import { useQuery } from "@tanstack/react-query";
import { getWorkOrders } from "../services/workOrderService";

export const useWorkOrders = () => {
  return useQuery({
    queryKey: ["workOrders"],
    queryFn: getWorkOrders,
    staleTime: 60 * 1000,
    retry: 1,
  });
};