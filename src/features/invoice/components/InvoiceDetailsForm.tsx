import { format } from "date-fns";
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
  useWatch,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Invoice } from "../types";
import ClientSelectPopover from "./ClientSelectPopover";

type InvoiceDetailsFormProps = {
  register: UseFormRegister<Invoice>;
  control: Control<Invoice>;
  errors: FieldErrors<Invoice>;
};

export default function InvoiceDetailsForm({
  register,
  control,
  errors,
}: InvoiceDetailsFormProps) {
  const issueDate = useWatch({ control, name: "issueDate" });
  const dueDate = useWatch({ control, name: "dueDate" });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="name">Client Name *</FieldLabel>
        <ClientSelectPopover control={control} />
        {errors.clientId && <FieldError>{errors.clientId.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="taxRate">Tax Rate (%)</FieldLabel>
        <Input
          id="taxRate"
          placeholder="0"
          {...register("taxRate", { valueAsNumber: true })}
        />
        {errors.taxRate && <FieldError>{errors.taxRate.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="issueDate">Issue Date *</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="issueDate"
              className="justify-start font-normal bg-input/20"
            >
              {issueDate ? format(issueDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Controller
              name="issueDate"
              control={control}
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  defaultMonth={field.value}
                />
              )}
            />
          </PopoverContent>
        </Popover>
        {errors.issueDate && (
          <FieldError>{errors.issueDate.message}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="dueDate">Due Date *</FieldLabel>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="dueDate"
              className="justify-start font-normal bg-input/20"
            >
              {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  defaultMonth={field.value}
                />
              )}
            />
          </PopoverContent>
        </Popover>
        {errors.dueDate && <FieldError>{errors.dueDate.message}</FieldError>}
      </Field>
    </div>
  );
}
