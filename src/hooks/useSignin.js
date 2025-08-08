import { useMutation } from "@tanstack/react-query";
import { getSignIn } from "../services/auth";

export function useSignIn({ onSuccess, onError }) {
  return useMutation({
    mutationFn: getSignIn,
    onSuccess,
    onError,
  });
}
