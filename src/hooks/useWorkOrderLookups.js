import { useQuery } from "@tanstack/react-query";
import {
  getPriorities,
  getWorkTypes,
  getWorkCategories,
  getTerritories,
  getSites,
  getBuildings,
  getFloors,
} from "../services/lookupService";

export const useWorkOrderLookups = () => {
  return useQuery({
    queryKey: ["workOrderLookups"],
    queryFn: async () => {
      const [
        priorities,
        workTypes,
        workCategories,
        territories,
        sites,
        buildings,
        floors,
      ] = await Promise.all([
        getPriorities(),
        getWorkTypes(),
        getWorkCategories(),
        getTerritories(),
        getSites(),
        getBuildings(),
        getFloors(),
      ]);

      return {
        priorities,
        workTypes,
        workCategories,
        territories,
        sites,
        buildings,
        floors,
      };
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};