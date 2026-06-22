import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clientsKeys } from "@/features/clients/queryKeys";
import { dashboardKeys } from "@/features/dashboard/queryKeys";
import { invoiceKeys } from "@/features/invoice/queryKeys";
import { paymentKeys } from "@/features/payments/queryKeys";

import { logout as logoutApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useLogout() {
  const queryClient = useQueryClient();

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null);
    },
    onSettled: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.removeQueries({ queryKey: invoiceKeys.all });
      queryClient.removeQueries({ queryKey: clientsKeys.all });
      queryClient.removeQueries({ queryKey: paymentKeys.all });
      queryClient.removeQueries({ queryKey: dashboardKeys.all });
      queryClient.setQueryData(authKeys.me(), null);
    },
  });

  return { logout, isLoggingOut };
}
