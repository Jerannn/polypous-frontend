import { Trash2 } from "lucide-react";
import { useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useInvoiceForm } from "../InvoiceFormContext";

type InvoiceItemFieldProps = {
  index: number;
};

export default function InvoiceItemField({ index }: InvoiceItemFieldProps) {
  const { form, onRemoveItem, fields, isSubmitting } = useInvoiceForm();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const quantity = useWatch({
    control: control,
    name: `items.${index}.quantity`,
  });

  const unitPrice = useWatch({
    control: control,
    name: `items.${index}.unitPrice`,
  });

  const total = (quantity || 0) * (unitPrice || 0);
  const itemErrors = errors.items?.[index];
  const canRemove = fields.fields.length > 1;

  return (
    <div>
      <div className="grid grid-cols-[1fr_80px_80px_70px_50px] gap-4 items-center mb-0">
        <Field>
          <FieldLabel htmlFor="description">Description *</FieldLabel>
          <Input
            id="description"
            placeholder="e.g. Web Design"
            aria-invalid={!!itemErrors?.description}
            disabled={isSubmitting}
            {...register(`items.${index}.description`)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="quantity">Quantity *</FieldLabel>
          <Input
            type="number"
            id="quantity"
            placeholder="0"
            disabled={isSubmitting}
            {...register(`items.${index}.quantity`, { valueAsNumber: true })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="unitPrice">Unit Price *</FieldLabel>
          <Input
            type="number"
            id="unitPrice"
            placeholder="0"
            disabled={isSubmitting}
            {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
          />
        </Field>

        <Field>
          <FieldLabel>Total</FieldLabel>
          <span className="py-1 font-bold">${total.toFixed(2)}</span>
        </Field>

        {canRemove && (
          <Button
            size="icon"
            type="button"
            variant="destructive"
            className="ml-auto"
            disabled={isSubmitting}
            onClick={() => onRemoveItem(index)}
          >
            <Trash2 />
          </Button>
        )}
      </div>
      {itemErrors && (
        <FieldError className="m-0 mt-2">
          {itemErrors.description?.message}
        </FieldError>
      )}
    </div>
  );
}
