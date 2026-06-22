import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useLogin() {
  const queryClient = useQueryClient();
  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationKey: authKeys.login(),
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me(), user);
    },
  });
  return { login, isLoggingIn };
}
