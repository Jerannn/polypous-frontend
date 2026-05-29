import { useMutation } from "@tanstack/react-query";

import { verifyEmailOtp as verifyEmailOtpApi } from "../api";
import { syncAuthUser } from "../utils/authSession";

export default function useVerifyEmail() {
  const { mutateAsync: verifyEmail, isPending: isVerifying } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: verifyEmailOtpApi,
    onSuccess: (user) => {
      syncAuthUser(user);
    },
  });

  return { verifyEmail, isVerifying };
}
