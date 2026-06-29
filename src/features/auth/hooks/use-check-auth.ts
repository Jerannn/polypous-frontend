import { useQuery } from "@tanstack/react-query";

import { meQueryOptions } from "../queries";

export default function useCheckAuth() {
  const {
    data: user,
    isPending: isCheckingAuth,
    isError,
    error,
    isFetching,
  } = useQuery(meQueryOptions());

  return { user, isCheckingAuth, isError, error, isFetching };
}
