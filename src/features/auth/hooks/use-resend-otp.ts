import { useMutation } from "@tanstack/react-query";

import { resendOtp as resendOtpApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useResendOtp() {
  const { mutateAsync: resendOtp, isPending: isResending } = useMutation({
    mutationKey: authKeys.resend(),
    mutationFn: resendOtpApi,
  });
  return { resendOtp, isResending };
}
