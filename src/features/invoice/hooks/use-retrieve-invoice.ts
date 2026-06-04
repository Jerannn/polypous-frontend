import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { invoicesListQueryOptions } from "../queries";
import type { InvoiceQueryPayload } from "../types";
import { useEffect } from "react";

export default function useRetrieveInvoice(query: InvoiceQueryPayload) {
  const queryClient = useQueryClient();

  const { page, limit, search } = query;

  const { data, isPending, isError, isFetching } = useQuery({
    ...invoicesListQueryOptions(query),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data?.meta?.nextPage) return;

    queryClient.prefetchQuery(
      invoicesListQueryOptions({ page: page + 1, limit, search }),
    );
  }, [data, page, limit, search, queryClient]);

  return { data, isPending, isError, isFetching };
}
