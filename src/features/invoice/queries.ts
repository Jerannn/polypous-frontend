import { queryOptions } from "@tanstack/react-query";

import {
  retrieveInvoice as retrieveInvoiceApi,
  retrieveInvoices as retrieveInvoicesApi,
} from "./api";
import { invoiceKeys } from "./queryKeys";
import type { InvoiceQueryPayload } from "./types";

export const invoicesListQueryOptions = (query: InvoiceQueryPayload) =>
  queryOptions({
    queryKey: invoiceKeys.list(query),
    queryFn: () => retrieveInvoicesApi(query),
    staleTime: 30_000,
  });

export const invoiceQueryOptions = (id: string) =>
  queryOptions({
    queryKey: invoiceKeys.detail(id),
    queryFn: () => retrieveInvoiceApi(id),
    staleTime: 30_000,
  });
