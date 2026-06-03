import { createFileRoute } from "@tanstack/react-router";

import InvoiceForm from "@/features/invoice/components/InvoiceForm";
import { InvoiceFormProvider } from "@/features/invoice/InvoiceFormContext";
export const Route = createFileRoute("/(protected)/invoices/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <InvoiceFormProvider>
      <InvoiceForm />
    </InvoiceFormProvider>
  );
}
