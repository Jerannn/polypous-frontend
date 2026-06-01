import InvoiceForm from "@/features/invoice/components/InvoiceForm";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(protected)/invoices/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InvoiceForm />;
}
