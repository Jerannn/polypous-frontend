import { useMutation, useQueryClient } from "@tanstack/react-query";

import { verifyEmailOtp as verifyEmailOtpApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useVerifyEmail() {
  const queryClient = useQueryClient();
  const { mutateAsync: verifyEmail, isPending: isVerifying } = useMutation({
    mutationKey: authKeys.verify(),
    mutationFn: verifyEmailOtpApi,
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me(), user);
    },
  });

  return { verifyEmail, isVerifying };
}
