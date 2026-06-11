import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubTeam,
  deleteSubTeam,
  getSubTeams,
  setSubTeamActive,
  setSubTeamInactive,
  updateSubTeam,
} from "../services/subTeamService";

export function useSubTeams() {
  return useQuery({
    queryKey: ["subTeams"],
    queryFn: getSubTeams,
  });
}

export function useCreateSubTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subTeams"] });
    },
  });
}

export function useUpdateSubTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subTeams"] });
    },
  });
}

export function useSetSubTeamActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setSubTeamActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subTeams"] });
    },
  });
}

export function useSetSubTeamInactive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setSubTeamInactive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subTeams"] });
    },
  });
}

export function useDeleteSubTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subTeams"] });
    },
  });
}