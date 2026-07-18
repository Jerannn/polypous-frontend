import { useMutation } from "@tanstack/react-query";

import { verifyPasswordReset as verifyPasswordResetApi } from "../api";

export default function useVerifyPasswordReset() {
  const { mutateAsync: verifyPasswordReset, isPending: isVerifying } =
    useMutation({
      mutationFn: verifyPasswordResetApi,
    });

  return { verifyPasswordReset, isVerifying };
}
