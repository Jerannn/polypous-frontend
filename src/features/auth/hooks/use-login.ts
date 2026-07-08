import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useLogin() {
  const queryClient = useQueryClient();
  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationKey: authKeys.login(),
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), data.data.user);
    },
  });
  return { login, isLoggingIn };
}
