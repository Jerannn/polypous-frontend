import { createFileRoute } from "@tanstack/react-router";

import InvoiceContainer from "@/features/invoice/components/InvoiceContainer";

export const Route = createFileRoute("/(protected)/invoices/")({
  component: InvoicePage,
});

function InvoicePage() {
  return <InvoiceContainer />;
}
