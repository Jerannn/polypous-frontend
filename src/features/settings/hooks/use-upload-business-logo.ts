import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBusinessLogo as updateBusinessLogoApi } from "../api";
import { settingsKeys } from "../queryKeys";

export default function useUploadBusinessLogo() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateBusinessLogo, isPending: isUpdating } =
    useMutation({
      mutationFn: updateBusinessLogoApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: settingsKeys.business() });
      },
    });

  return { updateBusinessLogo, isUpdating };
}
