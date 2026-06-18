import { createFileRoute } from "@tanstack/react-router";

import PendingState from "@/components/states/PendingState";
import Invoice from "@/features/invoice/components/details/Invoice";
import { invoiceQueryOptions } from "@/features/invoice/queries";
import { queryClient } from "@/lib/queryClient";

export const Route = createFileRoute(
  "/(protected)/invoices/$invoiceId/details",
)({
  component: InvoiceComponent,
  loader: async ({ params }) => {
    await queryClient.ensureQueryData(invoiceQueryOptions(params.invoiceId));
  },
  pendingComponent: () => <PendingState />,
});

function InvoiceComponent() {
  return <Invoice />;
}
