import { queryOptions } from "@tanstack/react-query";

import { retrieve as retrieveInvoiceApi } from "./api";
import { invoiceKeys } from "./queryKeys";
import type { InvoiceQueryPayload } from "./types";

export const invoicesListQueryOptions = (query: InvoiceQueryPayload) =>
  queryOptions({
    queryKey: invoiceKeys.list(query),
    queryFn: () => retrieveInvoiceApi(query),
    staleTime: 30_000,
  });
