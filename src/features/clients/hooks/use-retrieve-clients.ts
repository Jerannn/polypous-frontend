import { useQuery, useQueryClient } from "@tanstack/react-query";
import { retrieve } from "../api";
import type { QueryPayload } from "../types";
import { useEffect } from "react";
import { clientsKeys } from "../queryKeys";

const clientsQuery = (query: QueryPayload) => ({
  queryKey: clientsKeys.list(query),
  queryFn: () => retrieve(query),
});

export default function useRetrieveClients(query: QueryPayload) {
  const queryClient = useQueryClient();
  const { page, limit, search } = query;

  const { data, isLoading, isError } = useQuery({
    ...clientsQuery(query),
    enabled: !!query,
    staleTime: 1000 * 30,
  });

  // Prefetch next page
  useEffect(() => {
    if (!data?.meta?.nextPage) return;

    queryClient.prefetchQuery(clientsQuery({ ...query, page: page + 1 }));
  }, [data, page, limit, search]);

  return { data, isLoading, isError };
}
