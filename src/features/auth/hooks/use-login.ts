import { useMutation } from "@tanstack/react-query";

import { login as loginApi } from "../api";
import { syncAuthUser } from "../utils/authSession";

export default function useLogin() {
  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
    onSuccess: (user) => {
      syncAuthUser(user);
    },
  });
  return { login, isLoggingIn };
}
