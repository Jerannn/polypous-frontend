import { queryOptions } from "@tanstack/react-query";

import { getMe } from "./api";

export const meQueryOptions = queryOptions({
  queryKey: ["auth", "me"],
  queryFn: getMe,
  staleTime: 5 * 60 * 1000,
  retry: false,
});
