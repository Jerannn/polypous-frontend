import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

import { paymentsQueryOptions } from "../queries";
import type { PaymentQueryPayload } from "../types";

type useRetrievePaymentsProps = {
  query: PaymentQueryPayload;
};

export default function useRetrievePayments({
  query,
}: useRetrievePaymentsProps) {
  const queryClient = useQueryClient();

  const { page, limit, search } = query;

  const { data, isError, isPending, isFetching } = useQuery({
    ...paymentsQueryOptions(query),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data?.meta?.nextPage) return;

    queryClient.prefetchQuery(
      paymentsQueryOptions({ page: page + 1, limit, search }),
    );
  }, [data, page, limit, search, queryClient]);

  return { data, isError, isPending, isFetching };
}
