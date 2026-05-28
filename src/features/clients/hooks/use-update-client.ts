import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update as updateApi } from "../api";
import { clientsKeys } from "../queryKeys";

export default function useUpdateClient() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateClient, isPending: isUpdating } = useMutation({
    mutationFn: updateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientsKeys.all,
        exact: false,
      });
    },
  });
  return { updateClient, isUpdating };
}
