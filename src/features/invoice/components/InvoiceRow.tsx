import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { EllipsisVertical, FilePenLine, Form, Trash2 } from "lucide-react";
import { toast } from "sonner";

import ConfirmDeletionModal from "@/components/ConfirmDeletionModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import useDeleteInvoice from "../hooks/use-delete-invoice";
import type { InvoiceListItem } from "../types";

type InvoiceRowProps = {
  invoice: InvoiceListItem;
};

export default function InvoiceRow({ invoice }: InvoiceRowProps) {
  const { deleteInvoice, isDeleting, isError } = useDeleteInvoice();

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
            "w-17",
            invoice.status.toLowerCase() === "unpaid" &&
              "bg-accent/10 text-accent",
            invoice.status.toLowerCase() === "paid" &&
              "bg-primary/10 text-primary",
            invoice.status.toLowerCase() === "overdue" &&
              "bg-destructive/10 text-destructive",
          )}
        >
          {invoice.status}
        </Badge>
      </TableCell>
      <TableCell className="flex items-center justify-end text-right space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem asChild className="text-xs cursor-pointer">
              <Link
                to="/invoices/$invoiceId/details"
                params={{ invoiceId: invoice.id }}
              >
                <Form className="w-3.5 h-3.5 text-muted-foreground" />
                View Details
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="text-xs cursor-pointer">
              <Link
                to="/invoices/$invoiceId/edit"
                params={{ invoiceId: invoice.id }}
              >
                <FilePenLine className="w-3.5 h-3.5 text-muted-foreground" />
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <ConfirmDeletionModal
              onConfirm={async () => {
                const isDeleted = await deleteInvoice(invoice.id);
                if (isDeleted) toast.success("Invoice deleted successfully");

                return isDeleted;
              }}
              isPending={isDeleting}
              errorMessage={isError ? "Failed to delete invoice" : undefined}
              description="Are you sure you want to delete this invoice? This action cannot be reversed after confirmation."
              trigger={
                <DropdownMenuItem
                  variant="destructive"
                  className="text-xs cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                  Delete
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
