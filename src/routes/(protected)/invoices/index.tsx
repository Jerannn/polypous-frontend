import { createFileRoute } from "@tanstack/react-router";

import InvoiceContainer from "@/features/invoice/components/InvoiceContainer";
import { invoicesListQueryOptions } from "@/features/invoice/queries";
import { invoiceQuerySchema } from "@/features/invoice/schema";
import { queryClient } from "@/lib/queryClient";

export const Route = createFileRoute("/(protected)/invoices/")({
  component: InvoicePage,
  validateSearch: invoiceQuerySchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps: query }) =>
    void queryClient.prefetchQuery(invoicesListQueryOptions(query)),
});

function InvoicePage() {
  return <InvoiceContainer />;
}
