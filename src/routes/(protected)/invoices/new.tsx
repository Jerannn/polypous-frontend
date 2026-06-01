import { createFileRoute } from "@tanstack/react-router";

import InvoiceForm from "@/features/invoice/components/InvoiceForm";
export const Route = createFileRoute("/(protected)/invoices/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InvoiceForm />;
}
