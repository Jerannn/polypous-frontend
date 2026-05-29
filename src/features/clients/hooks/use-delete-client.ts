import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteClient as deleteClientApi } from "../api";
import { clientsKeys } from "../queryKeys";

export default function useDeleteClient() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteClient,
    isPending: isDeleting,
    isError,
  } = useMutation({
    mutationFn: (id: string) => deleteClientApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientsKeys.all,
        exact: false,
      });
    },
  });

  return { deleteClient, isDeleting, isError };
}
