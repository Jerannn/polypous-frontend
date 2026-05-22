import { useMutation } from "@tanstack/react-query";

import { verifyEmailOtp as verifyEmailOtpApi } from "../api";

export default function useVerifyEmail() {
  const { mutateAsync: verifyEmail, isPending: isVerifying } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: verifyEmailOtpApi,
  });

  return { verifyEmail, isVerifying };
}
