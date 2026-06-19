import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../api";

export default function useLogout() {
  const queryClient = useQueryClient();

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return { logout, isLoggingOut };
}
