import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiIncome";

export function useUser() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: getUser,
  });
}
