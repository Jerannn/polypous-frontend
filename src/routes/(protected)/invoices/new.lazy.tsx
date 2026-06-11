import { createLazyFileRoute } from "@tanstack/react-router";

import { InvoiceFormProvider } from "@/features/invoice/components/context/InvoiceFormContext";
import InvoiceForm from "@/features/invoice/components/form/InvoiceForm";

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
