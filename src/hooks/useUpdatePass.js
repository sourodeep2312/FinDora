import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserEmailAndPassword } from "../services/apiIncome";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function useUpdatePass() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updateUserEmailAndPassword,
    onSuccess: async () => {
      toast.success("Password updated successfully and logged out");
      queryClient.invalidateQueries({ queryKey: ["profiles"] });

      await supabase.auth.signOut();
      setTimeout(() => navigate("/signin"), 2000);
    },
    onError: (err) => {
      toast.error(`Failed to update email/password: ${err.message}`);
    },
  });
}
