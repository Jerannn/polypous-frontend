import { useMutation } from "@tanstack/react-query";

import { verifyEmailOtp as verifyEmailOtpApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useVerifyEmail() {
  const { mutateAsync: verifyEmail, isPending: isVerifying } = useMutation({
    mutationKey: authKeys.verify(),
    mutationFn: verifyEmailOtpApi,
  });

  return { verifyEmail, isVerifying };
}
