import { useQuery } from "@tanstack/react-query";
import { getWorkOrderById ,getChecklistTemplateByScope} from "../services/workOrderService";

export const useWorkOrderDetails = (workOrderId) => {
  return useQuery({
    queryKey: ["workOrderDetails", workOrderId],
    queryFn: () => getWorkOrderById(workOrderId),
    enabled: !!workOrderId,
  });
};

export const useChecklistTemplateByScope = (scope) => {
  return useQuery({
    queryKey: ["checklist-template-scope", scope],
    queryFn: () => getChecklistTemplateByScope(scope),
    enabled: !!scope,
  });
};

