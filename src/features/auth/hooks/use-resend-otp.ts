import { useMutation } from "@tanstack/react-query";

import { resendOtp as resendOtpApi } from "../api";

export default function useResendOtp() {
  const { mutateAsync: resendOtp, isPending: isResending } = useMutation({
    mutationKey: ["resend-otp"],
    mutationFn: resendOtpApi,
  });
  return { resendOtp, isResending };
}
