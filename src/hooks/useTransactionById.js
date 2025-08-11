import { useQuery } from "@tanstack/react-query";
import { fetchTransactionById } from "../services/apiIncome";

export function useTransactionById(id) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(id),
    enabled: !!id,
  });
}
