import { useMutation } from "@tanstack/react-query";

import { login as loginApi } from "../api";

export default function useLogin() {
  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
  });
  return { login, isLoggingIn };
}
