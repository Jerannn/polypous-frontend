import { useWatch } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useInvoiceForm } from "../InvoiceFormContext";

export default function InvoiceSummaryCard() {
  const { form } = useInvoiceForm();

  const items = useWatch({ control: form.control, name: "items" });
  const taxRate = useWatch({ control: form.control, name: "taxRate" }) || 0;

  const { subtotal, taxAmount, total } = items.reduce(
    (acc, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;

      return {
        subtotal: acc.subtotal + itemSubtotal,
        taxAmount: acc.taxAmount + itemSubtotal * (taxRate / 100),
        total: acc.total + itemSubtotal * (1 + taxRate / 100),
      };
    },
    { subtotal: 0, taxAmount: 0, total: 0 },
  );

  return (
    <Card className="w-full lg:max-w-sm">
      <CardHeader>
        <CardTitle>Invoice Summary</CardTitle>
        <CardDescription>Automatically calculated totals</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Tax ({taxRate}%)</span>
            <span className="font-bold">${taxAmount.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex flex-col items-center justify-between">
            <span className="font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
