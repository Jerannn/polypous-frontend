import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { EllipsisVertical, FilePenLine, Form, Trash2 } from "lucide-react";
import { toast } from "sonner";

import ConfirmDeletionModal from "@/components/ConfirmDeletionModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-36 p-1 gap-0 overflow-hidden"
            align="end"
          >
            <Button
              variant="ghost"
              className="hover:bg-accent cursor-pointer w-full"
              asChild
            >
              <Link
                to="/invoices/$invoiceId/details"
                params={{ invoiceId: invoice.id }}
              >
                <Item size="xs" className="p-0 ">
                  <ItemContent className="flex-row space-x-2">
                    <ItemMedia>
                      <Form className="w-3.5 h-3.5" />
                    </ItemMedia>
                    <ItemTitle className="text-xs/relaxed font-normal">
                      View Details
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-accent cursor-pointer"
              asChild
            >
              <Link
                to="/invoices/$invoiceId/edit"
                params={{ invoiceId: invoice.id }}
              >
                <Item size="xs" className="p-0 ">
                  <ItemContent className="flex-row space-x-2">
                    <ItemMedia>
                      <FilePenLine className="w-3.5 h-3.5" />
                    </ItemMedia>
                    <ItemTitle className="text-xs/relaxed font-normal">
                      Edit
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </Link>
            </Button>
            <Separator className="my-1 -mx-1" style={{ width: "180px" }} />
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
                <Button variant="destructive" className="w-full">
                  <Item size="xs" className="p-0 ">
                    <ItemContent className="flex-row space-x-2">
                      <ItemMedia>
                        <Trash2 className="w-3.5 h-3.5" />
                      </ItemMedia>
                      <ItemTitle className="text-xs/relaxed font-normal">
                        Delete
                      </ItemTitle>
                    </ItemContent>
                  </Item>
                </Button>
              }
            />
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}
