import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "@/features/auth/AuthProvider";

import { deleteMe as deleteMeApi } from "../api";

export default function useDeleteAccount() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: deleteMe, isPending: isDeleting } = useMutation({
    mutationFn: deleteMeApi,
    onSuccess: async () => {
      const status = await logout();
      if (status === "success") navigate({ to: "/auth/login" });
    },
  });

  return { deleteMe, isDeleting };
}
