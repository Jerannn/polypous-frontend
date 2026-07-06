import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invoiceKeys } from "@/features/invoice/queryKeys";

import { updateMyBusiness as updateMyBusinessApi } from "../api";
import { settingsKeys } from "../queryKeys";

export default function useUpdateBusiness() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateBusiness, isPending: isUpdating } = useMutation({
    mutationKey: settingsKeys.business(),
    mutationFn: updateMyBusinessApi,
    onSuccess: (data) => {
      queryClient.setQueryData(settingsKeys.business(), data);
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
    },
  });

  return { updateBusiness, isUpdating };
}
