import { createLazyFileRoute } from "@tanstack/react-router";

import InvoiceForm from "@/features/invoice/components/form/InvoiceForm";
import { InvoiceFormProvider } from "@/features/invoice/InvoiceFormContext";

export const Route = createLazyFileRoute("/(protected)/invoices/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <InvoiceFormProvider>
      <InvoiceForm />
    </InvoiceFormProvider>
  );
}
