import type { InvoiceQueryPayload } from "./types";

export const invoiceKeys = {
  all: ["invoices"] as const,
  list: (params: InvoiceQueryPayload) => [...invoiceKeys.all, params] as const,
};
