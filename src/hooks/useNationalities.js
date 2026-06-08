// src/hooks/useNationalities.js
import { useQuery } from "@tanstack/react-query";
import { getNationalities } from "../services/nationalityService";

export function useNationalities() {
  return useQuery({
    queryKey: ["nationalities"],
    queryFn: getNationalities,
  });
}