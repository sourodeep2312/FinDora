import { useMutation } from "@tanstack/react-query";
import { getSignOut } from "../services/auth";

export function useSignOut({ onSuccess, onError }) {
  return useMutation({
    mutationFn: getSignOut,
    onSuccess,
    onError,
  });
}
