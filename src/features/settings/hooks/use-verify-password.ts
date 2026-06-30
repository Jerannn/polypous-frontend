import { useMutation } from "@tanstack/react-query";

import { verifyPassword as verifyPasswordApi } from "../api";

export default function useVerifyPassword() {
  const { mutateAsync: verifyPassword, isPending: isVerifying } = useMutation({
    mutationFn: verifyPasswordApi,
  });
  return { verifyPassword, isVerifying };
}
