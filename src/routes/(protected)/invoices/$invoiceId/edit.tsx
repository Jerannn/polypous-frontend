import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import InvoiceForm from "@/features/invoice/components/form/InvoiceForm";
import { InvoiceFormProvider } from "@/features/invoice/InvoiceFormContext";
import { invoiceQueryOptions } from "@/features/invoice/queries";
import { queryClient } from "@/lib/queryClient";

export const Route = createFileRoute("/(protected)/invoices/$invoiceId/edit")({
  component: EditInvoice,
  loader: async ({ params }) => {
    await queryClient.ensureQueryData(invoiceQueryOptions(params.invoiceId));
  },
});

function EditInvoice() {
  const { invoiceId } = Route.useParams();

  const { data } = useSuspenseQuery(invoiceQueryOptions(invoiceId));

  const invoice = {
    clientId: data?.client.id,
    taxRate: data?.tax,
    issueDate: data?.issueDate,
    dueDate: data?.dueDate,
    notes: data?.notes,
    items: data?.items,
  };

  return (
    <InvoiceFormProvider
      initialInvoice={invoice}
      action="edit"
      invoiceId={invoiceId}
    >
      <InvoiceForm />
    </InvoiceFormProvider>
  );
}
