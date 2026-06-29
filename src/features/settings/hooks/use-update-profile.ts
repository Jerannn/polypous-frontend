import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authKeys } from "@/features/auth/queryKeys";

import { updateProfile as updateProfileApi } from "../api";
import { settingsKeys } from "../queryKeys";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
    mutationKey: settingsKeys.profile(),
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), data);
    },
  });
  return { updateProfile, isUpdating };
}
