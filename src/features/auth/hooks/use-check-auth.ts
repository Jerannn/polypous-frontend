import { useQuery } from "@tanstack/react-query";

import { meQueryOptions } from "../queries";

export default function useCheckAuth() {
  const {
    data: currentUser,
    isPending: isCheckingAuth,
    isError,
    error,
    isFetching,
  } = useQuery(meQueryOptions());

  return { currentUser, isCheckingAuth, isError, error, isFetching };
}
