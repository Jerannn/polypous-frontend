import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Copy,
  Download,
  Ellipsis,
  FilePenLine,
  Send,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import ConfirmDeletionModal from "@/components/ConfirmDeletionModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useDeleteInvoice from "../../hooks/use-delete-invoice";
import { useInvoiceDetails } from "../context/InvoiceDetailsContext";

export default function InvoiceDetailsHeader() {
  const navigate = useNavigate();
  const { invoiceId, invoice } = useInvoiceDetails();

  const { deleteInvoice, isDeleting, isError } = useDeleteInvoice();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
      <div className="space-y-1">
        <Button variant="link" className="px-0" asChild>
          <Link
            to="/invoices"
            className="group inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <ChevronLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Invoices
          </Link>
        </Button>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {invoice.invoiceNumber}
          </h1>
          <Badge
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border-transparent capitalize ${
              invoice.status === "PAID"
                ? "bg-primary/10 text-primary hover:bg-primary/10"
                : invoice.status === "UNPAID"
                  ? "bg-accent/10 text-accent hover:bg-accent/10"
                  : "bg-destructive/10 text-destructive hover:bg-destructive/10"
            }`}
          >
            {invoice.status}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ButtonGroup>
          <Button
            variant="outline"
            //   onClick={handleDownloadPDF}
          >
            <Download className="mr-2 h-5 w-5" />
            Print / PDF
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild className="text-xs cursor-pointer">
                <Link to="/invoices/$invoiceId/edit" params={{ invoiceId }}>
                  <FilePenLine className="w-3.5 h-3.5 mr-2 size-3.5 text-muted-foreground" />
                  Edit Invoice
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-xs cursor-pointer"
                // onClick={handleDuplicate}
              >
                <Copy className="w-3.5 h-3.5 mr-2 size-3.5 text-muted-foreground" />
                Duplicate Invoice
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-xs cursor-pointer"
                // onClick={handleSendReminder}
              >
                <Send className="w-3.5 h-3.5 mr-2 size-3.5 text-muted-foreground" />
                Send Reminder
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <ConfirmDeletionModal
                onConfirm={async () => {
                  const isDeleted = await deleteInvoice(invoiceId);
                  if (isDeleted) {
                    toast.success("Invoice deleted successfully");
                    navigate({ to: "/invoices", replace: true });
                  }

                  return isDeleted;
                }}
                isPending={isDeleting}
                errorMessage={isError ? "Failed to delete invoice" : undefined}
                description="Are you sure you want to delete this invoice? This action cannot be reversed after confirmation."
                trigger={
                  <DropdownMenuItem
                    variant="destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2 size-3.5 text-muted-foreground" />
                    Delete Invoice
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
    </div>
  );
}
