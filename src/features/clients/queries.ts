import { queryOptions } from "@tanstack/react-query";

import { retrieve } from "./api";
import { clientsKeys } from "./queryKeys";
import type { QueryPayload } from "./types";

export const clientsListQueryOptions = (query: QueryPayload) =>
  queryOptions({
    queryKey: clientsKeys.list(query),
    queryFn: () => retrieve(query),
    staleTime: 30_000,
  });
