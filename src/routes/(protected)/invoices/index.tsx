import { createFileRoute } from "@tanstack/react-router";

import RouteError from "@/components/routing/RouteError";
import InvoiceContainer from "@/features/invoice/components/InvoiceContainer";
import { invoicesListQueryOptions } from "@/features/invoice/queries";
import { invoiceQuerySchema } from "@/features/invoice/schema";
import { queryClient } from "@/lib/queryClient";
import { APP_NAME } from "@/utils/constants";

export const Route = createFileRoute("/(protected)/invoices/")({
  component: InvoicePage,
  validateSearch: invoiceQuerySchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps: query }) =>
    void queryClient.prefetchQuery(invoicesListQueryOptions(query)),
  errorComponent: (props) => (
    <RouteError {...props} title="Unable to load invoices" />
  ),
  head: () => ({
    meta: [{ title: `Clients | ${APP_NAME}` }],
  }),
});

function InvoicePage() {
  return <InvoiceContainer />;
}
