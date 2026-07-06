import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invoiceKeys } from "@/features/invoice/queryKeys";

import { create as createClientApi } from "../api";
import { clientsKeys } from "../queryKeys";

export default function useCreateClient() {
  const queryClient = useQueryClient();

  const { mutateAsync: createClient, isPending: isCreating } = useMutation({
    mutationFn: createClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientsKeys.all,
      });

      queryClient.invalidateQueries({ queryKey: invoiceKeys.options("") });
    },
  });

  return { createClient, isCreating };
}
