import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "@tanstack/react-router";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import ActionButtonContent from "@/components/ActionButtonContent";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import useRecordPayment from "../hooks/use-record-payment";
import { recordPaymentSchema } from "../schema";
import type { RecordPaymentPayload } from "../types";
import { useInvoiceDetails } from "./context/InvoiceDetailsContext";

export default function RecordPayment() {
  const { invoiceId } = useParams({
    from: "/(protected)/invoices/$invoiceId/details",
  });

  const [open, setOpen] = useState(false);
  const { invoice } = useInvoiceDetails();
  const { recordPayment, isRecording } = useRecordPayment(invoiceId);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<RecordPaymentPayload>({
    resolver: zodResolver(recordPaymentSchema),
    defaultValues: {
      amount: 0,
      paymentMethod: "",
      referenceNumber: "",
      paymentDate: new Date(),
    },
  });

  const paymentDate = useWatch({ control, name: "paymentDate" });
  const amount = useWatch({ control, name: "amount" });

  const onSubmit = async (data: RecordPaymentPayload) => {
    if (amount > invoice.balance) {
      setError("amount", { message: "Amount must not exceed invoice balance" });
      return;
    }

    await recordPayment(data);
    toast.success("Payment recorded successfully!");
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" className="w-full py-4">
          <Plus /> Record Payment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogDescription>Add a payment for this invoice</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="amount">Amount *</FieldLabel>
              <Input
                type="number"
                id="amount"
                placeholder="0.00"
                step="0.01"
                disabled={isRecording}
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <FieldError>{errors.amount.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="paymentMethod">Payment Method *</FieldLabel>
              <Input
                type="text"
                id="paymentMethod"
                placeholder="e.g. Credit Card, PayPal, Cash, etc."
                disabled={isRecording}
                {...register("paymentMethod")}
              />
              {errors.paymentMethod && (
                <FieldError>{errors.paymentMethod.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="referenceNumber">
                Reference Number
              </FieldLabel>
              <Input
                type="text"
                id="referenceNumber"
                placeholder="Transaction reference"
                disabled={isRecording}
                {...register("referenceNumber")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="paymentDate">Payment Date</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="issueDate"
                    className="justify-start font-normal bg-input/20"
                    disabled={isRecording}
                  >
                    {paymentDate ? (
                      format(paymentDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="start">
                  <Controller
                    name="paymentDate"
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
            </Field>

            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Textarea
                id="notes"
                placeholder="e.g. Payment for invoice #123"
                disabled={isRecording}
                {...register("notes")}
              />
              {errors.notes && <FieldError>{errors.notes.message}</FieldError>}
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="w-full py-4 mt-4"
            disabled={isRecording}
          >
            <ActionButtonContent
              action={isRecording ? "Recording..." : "Record Payment"}
              isLoading={isRecording}
            />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
