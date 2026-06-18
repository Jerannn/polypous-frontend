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
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  return { currentUser, isCheckingAuth, isError };
}
