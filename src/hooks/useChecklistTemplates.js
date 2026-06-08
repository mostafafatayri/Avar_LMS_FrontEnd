import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createChecklistTemplate,
  getChecklistTemplates,
  getChecklistTemplateById,
  getChecklistTemplateByScope,
} from "../services/checklistService";

export const useChecklistTemplates = () => {
  return useQuery({
    queryKey: ["checklistTemplates"],
    queryFn: getChecklistTemplates,
  });
};

export const useChecklistTemplateById = (templateId) => {
  return useQuery({
    queryKey: ["checklistTemplate", templateId],
    queryFn: () => getChecklistTemplateById(templateId),
    enabled: !!templateId,
  });
};

export const useChecklistTemplateByScope = (scope) => {
  return useQuery({
    queryKey: ["checklistTemplateByScope", scope],
    queryFn: () => getChecklistTemplateByScope(scope),
    enabled: !!scope,
  });
};

export const useCreateChecklistTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChecklistTemplate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checklistTemplates"],
      });
    },
  });
};