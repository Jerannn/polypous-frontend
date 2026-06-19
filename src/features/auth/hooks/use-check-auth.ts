import { useQuery } from "@tanstack/react-query";

import { getMe as getMeApi } from "../api";
import { authKeys } from "../queryKeys";

export default function useCheckAuth() {
  const {
    data: currentUser,
    isPending: isCheckingAuth,
    isError,
  } = useQuery({
    queryKey: authKeys.me(),
    queryFn: getMeApi,
    retry: false,
  });

  return { currentUser, isCheckingAuth, isError };
}
