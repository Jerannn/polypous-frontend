import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useLogout() {
  const queryClient = useQueryClient();

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      queryClient.clear();
    },
  });

  return { logout, isLoggingOut };
}
