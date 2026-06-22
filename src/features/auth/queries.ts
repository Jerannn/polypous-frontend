import { type QueryClient, queryOptions } from "@tanstack/react-query";

import { ApiError } from "@/utils/apiError";

import { getMe as getMeApi } from "./api";
import { authKeys } from "./queryKeys";
import type { User } from "./types";

export function getMeFromCache(
  queryClient: QueryClient,
): User | null | undefined {
  return queryClient.getQueryData<User | null | undefined>(authKeys.me());
}

export function meQueryOptions() {
  return queryOptions({
    queryKey: authKeys.me(),
    queryFn: getMeApi,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.statusCode === 401) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
