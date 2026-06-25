import { Separator } from "@/components/ui/separator";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

import { useInvoiceDetails } from "../context/InvoiceDetailsContext";

export default function InvoiceTotals() {
  const { invoice } = useInvoiceDetails();
  const formatCurrency = useCurrencyFormatter();

  return (
    <div className="flex justify-end">
      <div className="w-full sm:max-w-xs space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground print:text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-foreground print:text-black">
            {formatCurrency(invoice?.subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground print:text-gray-600">
          <span>Tax (10%)</span>
          <span className="font-medium text-foreground print:text-black">
            {formatCurrency(invoice?.taxAmount)}
          </span>
        </div>

        <Separator className="bg-border/40" />

        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-lg p-3 flex justify-between items-center text-primary print:bg-gray-100 print:text-black print:border-gray-200">
          <span className="text-xs font-semibold">Total Amount</span>
          <span className="text-base font-bold">
            {formatCurrency(invoice?.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
