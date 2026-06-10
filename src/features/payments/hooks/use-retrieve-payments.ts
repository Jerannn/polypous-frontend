import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { paymentsQueryOptions } from "../queries";
import type { PaymentQueryPayload } from "../types";

type useRetrievePaymentsProps = {
  query: PaymentQueryPayload;
};

export default function useRetrievePayments({
  query,
}: useRetrievePaymentsProps) {
  const { data, isError, isPending, isFetching } = useQuery({
    ...paymentsQueryOptions(query),
    placeholderData: keepPreviousData,
  });
  return { data, isError, isPending, isFetching };
}
