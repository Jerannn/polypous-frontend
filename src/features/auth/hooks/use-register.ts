import { useMutation } from "@tanstack/react-query";

import { register as registerApi } from "../api";

export default function useRegister() {
  const { mutateAsync: registerUser, isPending: isRegistering } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerApi,
  });
  return { registerUser, isRegistering };
}
