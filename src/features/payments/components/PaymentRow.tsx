import { format } from "date-fns";
import { Check, Copy, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import type { PaymentListItem } from "../types";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

type PaymentRowProps = {
  payment: PaymentListItem;
};

export default function PaymentRow({ payment }: PaymentRowProps) {
  const [isCopied, setIsCopied] = useState(false);
  const formatCurrency = useCurrencyFormatter();

  const handleCopy = async () => {
    if (!payment.referenceNumber) return;

    try {
      await navigator.clipboard.writeText(payment.referenceNumber);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    } finally {
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <TableRow key={payment.id}>
      <TableCell>{format(payment.paymentDate, "PPP")}</TableCell>
      <TableCell>{payment.invoiceNumber}</TableCell>
      <TableCell>{payment.clientName}</TableCell>
      <TableCell className="text-primary">
        {formatCurrency(payment.amount)}
      </TableCell>
      <TableCell>
        <Badge variant="default">{payment.paymentMethod}</Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {payment.referenceNumber ? (
          <div className="flex items-center gap-1">
            {payment.referenceNumber}
            <Button size="sm" variant="ghost" onClick={handleCopy}>
              {isCopied ? <Check /> : <Copy />}
            </Button>
          </div>
        ) : (
          "N/A"
        )}
      </TableCell>
      <TableCell className="flex items-center justify-end text-right space-x-3">
        <Button variant="ghost">
          <SquareArrowOutUpRight />
        </Button>
      </TableCell>
    </TableRow>
  );
}
