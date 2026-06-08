import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateInvoice as updateInvoiceApi } from "../api";
import { invoiceKeys } from "../queryKeys";

export default function useUpdateInvoice() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateInvoice, isPending: isUpdating } = useMutation({
    mutationFn: updateInvoiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.all,
        exact: false,
      });
    },
  });
  return { updateInvoice, isUpdating };
}
