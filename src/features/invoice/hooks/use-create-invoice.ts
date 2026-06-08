import { useMutation } from "@tanstack/react-query";

import { createInvoice as createApi } from "../api";

export default function useCreateInvoice() {
  const { mutateAsync: createInvoice, isPending: isCreating } = useMutation({
    mutationFn: createApi,
  });

  return { createInvoice, isCreating };
}
