import { useMutation } from "@tanstack/react-query";

import { login as loginApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useLogin() {
  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationKey: authKeys.login(),
    mutationFn: loginApi,
  });
  return { login, isLoggingIn };
}
