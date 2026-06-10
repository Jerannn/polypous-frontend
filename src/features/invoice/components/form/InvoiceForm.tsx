import { useNavigate } from "@tanstack/react-router";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useInvoiceForm } from "@/features/invoice/components/context/InvoiceFormContext";
import InvoiceDetailsCard from "@/features/invoice/components/form/InvoiceDetailsCard";
import InvoiceItemsCard from "@/features/invoice/components/form/InvoiceItemsCard";
import InvoiceSummaryCard from "@/features/invoice/components/form/InvoiceSummaryCard";

export default function InvoiceForm() {
  const navigate = useNavigate();
  const { form, onSubmit, isSubmitting, action } = useInvoiceForm();

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold text-foreground">Create Invoice</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to create a new invoice
        </p>
      </div>

      <form
        className="space-y-4"
        id="invoice-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4 items-start">
          <div>
            <InvoiceDetailsCard />

            <InvoiceItemsCard />
          </div>

          <InvoiceSummaryCard />
        </FieldGroup>
      </form>

      <div className="flex justify-end gap-4 self-end mt-4">
        <Button
          variant="outline"
          size="lg"
          disabled={isSubmitting}
          onClick={() =>
            navigate({
              to: "/invoices",
            })
          }
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="invoice-form"
          size="lg"
          disabled={isSubmitting}
        >
          <ActionButtonContent action={action} isLoading={isSubmitting} />
        </Button>
      </div>
    </div>
  );
}
