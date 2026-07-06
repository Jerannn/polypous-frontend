import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardKeys } from "@/features/dashboard/queryKeys";

import { deleteInvoice as deleteInvoiceApi } from "../api";
import { invoiceKeys } from "../queryKeys";

export default function useDeleteInvoice() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteInvoice,
    isPending: isDeleting,
    isError,
  } = useMutation({
    mutationFn: (id: string) => deleteInvoiceApi(id),
    onSuccess: (_, invoiceId) => {
      queryClient.removeQueries({ queryKey: invoiceKeys.detail(invoiceId) });

      queryClient.invalidateQueries({
        queryKey: invoiceKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: dashboardKeys.overview(),
      });
    },
  });

  return { deleteInvoice, isDeleting, isError };
}
