import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        exact: false,
      });
    },
  });

  return { deleteInvoice, isDeleting, isError };
}
