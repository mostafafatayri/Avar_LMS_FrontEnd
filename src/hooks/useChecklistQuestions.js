import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChecklistQuestionsByTemplate,
  createChecklistQuestion,
  updateChecklistQuestion,
  deleteChecklistQuestion,
} from "../services/checklistService";

export const useChecklistQuestions = (templateId) => {
  return useQuery({
    queryKey: ["checklistQuestions", templateId],
    queryFn: () => getChecklistQuestionsByTemplate(templateId),
    enabled: !!templateId,
  });
};

export const useCreateChecklistQuestion = (templateId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createChecklistQuestion(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checklistQuestions", templateId],
      });
    },
  });
};


export const useUpdateChecklistQuestion = (templateId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, payload }) =>
      updateChecklistQuestion(questionId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checklistQuestions", templateId],
      });
    },
  });
};

export const useDeleteChecklistQuestion = (templateId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId) => deleteChecklistQuestion(questionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checklistQuestions", templateId],
      });
    },
  });
};

