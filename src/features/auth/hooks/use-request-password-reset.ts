import { useMutation } from "@tanstack/react-query";

import { requestPasswordReset as requestPasswordResetApi } from "../api";

export default function useRequestPasswordReset() {
  const { mutateAsync: requestPasswordReset, isPending: isRequesting } =
    useMutation({
      mutationFn: requestPasswordResetApi,
    });

  return { requestPasswordReset, isRequesting };
}
