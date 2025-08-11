import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "../services/apiIncome";

export function useUpdateTransaction(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) => updateTransaction(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
    ...options,
  });
}
