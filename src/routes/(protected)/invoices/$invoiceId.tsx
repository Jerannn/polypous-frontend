import PendingState from "@/components/states/PendingState";
import Invoice from "@/features/invoice/components/Invoice";
import { invoiceQueryOptions } from "@/features/invoice/queries";
import { queryClient } from "@/lib/queryClient";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/invoices/$invoiceId")({
  component: InvoiceComponent,
  loader: async ({ params }) => {
    await queryClient.ensureQueryData(invoiceQueryOptions(params.invoiceId));
  },
  pendingComponent: () => <PendingState />,
  pendingMs: 0,
});

function InvoiceComponent() {
  return <Invoice />;
}
