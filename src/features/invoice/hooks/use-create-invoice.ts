import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInvoice as createApi } from "../api";
import { invoiceKeys } from "../queryKeys";
import { dashboardKeys } from "@/features/dashboard/queryKeys";

export default function useCreateInvoice() {
  const queryClient = useQueryClient();

  const { mutateAsync: createInvoice, isPending: isCreating } = useMutation({
    mutationFn: createApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invoiceKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: dashboardKeys.overview(),
      });
    },
  });

  return { createInvoice, isCreating };
}
