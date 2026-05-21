import { useMutation } from "@tanstack/react-query";
import { createUser } from "../api/createUser";

export default function useRegister() {
  const {
    mutateAsync: registerUser,
    isPending: isRegistering,
    isError,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: createUser,
  });
  return { registerUser, isRegistering, isError };
}
