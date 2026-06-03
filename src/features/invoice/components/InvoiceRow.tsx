import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { Invoice } from "../types";

type InvoiceRowProps = {
  invoice: Invoice;
};

export default function InvoiceRow({ invoice }: InvoiceRowProps) {
  return (
    <TableRow key={invoice.id}>
      <TableCell className="max-w-60 font-medium">
        {invoice.invoiceNumber}
      </TableCell>
      <TableCell className="max-w-100">{invoice.clientName}</TableCell>
      <TableCell className="text-center">
        {format(invoice.issueDate, "PPP")}
      </TableCell>
      <TableCell className="text-center">
        {format(invoice.dueDate, "PPP")}
      </TableCell>
      <TableCell className="text-center font-medium">
        ${invoice.total}
      </TableCell>
      <TableCell className="text-center">
        <Badge
          variant="secondary"
          className={cn(
            invoice.status.toLowerCase() === "unpaid" &&
              "bg-accent/10 text-accent",
            invoice.status.toLowerCase() === "paid" &&
              "bg-primary/20 text-primary",
            invoice.status.toLowerCase() === "overdue" &&
              "bg-destructive/10 text-destructive",
          )}
        >
          {invoice.status}
        </Badge>
      </TableCell>
      <TableCell className="flex items-center justify-end text-right space-x-3"></TableCell>
    </TableRow>
  );
}
