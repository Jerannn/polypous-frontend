import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/invoices/")({
  component: InvoicePage,
});

function InvoicePage() {
  return <div>INVOICE PAGE</div>;
}
