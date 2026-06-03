import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { invoicesListQueryOptions } from "../queries";
import type { InvoiceQueryPayload } from "../types";

export default function useRetrieveInvoice(query: InvoiceQueryPayload) {
  const { data, isPending, isError } = useQuery({
    ...invoicesListQueryOptions(query),
    placeholderData: keepPreviousData,
  });

  return { data, isPending, isError };
}
