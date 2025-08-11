import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../services/apiIncome";
export function useCreateTransaction({ onSuccess, onError }) {
  return useMutation({
    mutationFn: createTransaction,
    onSuccess,
    onError,
  });
}
