import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

import { clientsListQueryOptions } from "../queries";
import type { QueryPayload } from "../types";

export default function useRetrieveClients(query: QueryPayload) {
  const queryClient = useQueryClient();
  const { page, limit, search } = query;

  const { data, isError, isFetching, isPending } = useQuery({
    ...clientsListQueryOptions(query),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data?.meta?.nextPage) return;

    queryClient.prefetchQuery(
      clientsListQueryOptions({ page: page + 1, limit, search }),
    );
  }, [data, page, limit, search, queryClient]);

  return { data, isError, isFetching, isPending };
}
