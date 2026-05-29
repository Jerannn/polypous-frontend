import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { logout as logoutApi } from "../api";
import { clearAuthSession } from "../utils/authSession";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      clearAuthSession();
      queryClient.clear();
      navigate({ to: "/auth/login", replace: true });
    },
  });

  return { logout, isLoggingOut };
}
