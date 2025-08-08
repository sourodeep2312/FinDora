import { useMutation } from "@tanstack/react-query";
import { getSignUp } from "../services/auth";
export function useSignUp({ onSuccess, onError }) {
  return useMutation({
    mutationFn: getSignUp,
    onSuccess,
    onError,
  });
}
