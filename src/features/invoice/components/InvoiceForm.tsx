import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import InvoiceDetailsForm from "@/features/invoice/components/InvoiceDetailsForm";
import InvoiceItemField from "@/features/invoice/components/InvoiceItemField";
import { invoiceSchema } from "@/features/invoice/schema";
import type { Invoice } from "@/features/invoice/types";

import InvoiceDetailsCard from "./InvoiceDetailsCard";
import InvoiceItemsCard from "./InvoiceItemsCard";
import InvoiceSummaryCard from "./InvoiceSummaryCard";

export default function InvoiceForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      clientId: "",
      taxRate: 0,
      issueDate: new Date(),
      dueDate: undefined,
      notes: "",
      items: [
        {
          description: "",
          quantity: 0,
          unitPrice: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: Invoice) => {
    console.log("Form data:", data);
  };

  const handleAddItem = () =>
    append({
      description: "",
      quantity: 1,
      unitPrice: 0,
    });

  const handleRemoveItem = (index: number) => remove(index);

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4 items-start">
          <div>
            <InvoiceDetailsCard>
              <InvoiceDetailsForm
                register={register}
                control={control}
                errors={errors}
              />
            </InvoiceDetailsCard>

            <InvoiceItemsCard onAddItem={handleAddItem}>
              {fields.map((field, index) => (
                <InvoiceItemField
                  key={field.id}
                  index={index}
                  totalFields={fields.length}
                  control={control}
                  register={register}
                  errors={errors}
                  onRemove={handleRemoveItem}
                />
              ))}
            </InvoiceItemsCard>
          </div>

          <InvoiceSummaryCard />
        </FieldGroup>
      </form>

      <div className="flex justify-end gap-4 self-end mt-4">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" form="invoice-form">
          Save
        </Button>
      </div>
    </div>
  );
}
