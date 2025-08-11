import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserName } from "../services/apiIncome";

export function useUpdateName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      toast.success("Name updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      toast.error(`Error updating email: ${error.message}`);
    },
  });
}
