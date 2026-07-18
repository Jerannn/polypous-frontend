import { useMutation } from "@tanstack/react-query";

import { resetPassword as resetPasswordApi } from "../api";

export default function useResetPassword() {
  const { mutateAsync: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: resetPasswordApi,
  });

  return { resetPassword, isResetting };
}
