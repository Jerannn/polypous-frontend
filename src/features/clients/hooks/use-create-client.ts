import { useMutation } from "@tanstack/react-query";

import { create as createClientApi } from "../api";

export default function useCreateClient() {
  const { mutateAsync: createClient, isPending: isCreating } = useMutation({
    mutationFn: createClientApi,
  });

  return { createClient, isCreating };
}
