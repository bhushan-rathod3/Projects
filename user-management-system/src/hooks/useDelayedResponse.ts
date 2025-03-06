import { useQuery } from "@tanstack/react-query";
import { getDelayedResponse } from "../api/users";

export const useDelayedResponse = () => {
  return useQuery({
    queryKey: ["delayed-response"],
    queryFn: getDelayedResponse,
    staleTime: 1000 * 60 * 5,
  });
};
