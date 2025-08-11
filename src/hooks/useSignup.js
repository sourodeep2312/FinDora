import { useMutation } from "@tanstack/react-query";
import { getSignUp } from "../services/auth";
export function useSignUp({ onSuccess, onError }) {
  return useMutation({
    mutationFn: ({ email, password, fullName }) =>
      getSignUp({ email, password, fullName }),
    onSuccess,
    onError,
  });
}
