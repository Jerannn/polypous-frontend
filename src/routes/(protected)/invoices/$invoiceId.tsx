import Invoice from "@/features/invoice/components/Invoice";
import { invoiceQueryOptions } from "@/features/invoice/queries";
import { queryClient } from "@/lib/queryClient";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/invoices/$invoiceId")({
  component: InvoiceComponent,
  loader: async ({ params }) => {
    await queryClient.ensureQueryData(invoiceQueryOptions(params.invoiceId));
  },
  pendingMs: 0,
  pendingComponent: () => <div>Loading Pending...</div>,
  notFoundComponent: () => <div>Invoice not found</div>,
});

function InvoiceComponent() {
  return <Invoice />;
}
