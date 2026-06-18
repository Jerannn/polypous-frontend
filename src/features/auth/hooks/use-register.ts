import { useMutation } from "@tanstack/react-query";

import { register as registerApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useRegister() {
  const { mutateAsync: registerUser, isPending: isRegistering } = useMutation({
    mutationKey: authKeys.register(),
    mutationFn: registerApi,
  });
  return { registerUser, isRegistering };
}
