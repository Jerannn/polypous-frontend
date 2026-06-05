import { useState } from "react";
import { getRouteApi, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar01Icon,
  Download01Icon,
  Mail01Icon,
  Location01Icon,
  Call02Icon,
  MoreHorizontalIcon,
  CheckmarkCircle02Icon,
  Dollar01Icon,
  ArrowLeft01Icon,
  PencilEdit01Icon,
  Copy01Icon,
  Delete01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/img/logo.svg";
import { format } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";
import { invoiceQueryOptions } from "../queries";

const routeApi = getRouteApi("/(protected)/invoices/$invoiceId");

export default function Invoice() {
  const { invoiceId } = routeApi.useParams();
  const { data: invoice } = useSuspenseQuery(invoiceQueryOptions(invoiceId));
  const [status, setStatus] = useState<"Paid" | "Unpaid" | "Overdue">("Unpaid");

  const handleMarkPaid = () => {
    setStatus("Paid");
    toast.success(`Invoice ${invoiceId} marked as paid`);
  };
  const handleRecordPayment = () => {
    setStatus("Paid");
    toast.success(`Payment of $1,320.00 recorded successfully`);
  };
  const handleDownloadPDF = () => {
    toast.info("Opening browser print dialog...");
    setTimeout(() => {
      window.print();
    }, 500);
  };
  const handleSendReminder = () => {
    toast.success(`Reminder email sent to owner@localcoffee.com`);
  };
  const handleDuplicate = () => {
    toast.success(`Invoice ${invoiceId} duplicated successfully`);
  };
  const handleDelete = () => {
    toast.error(`Invoice ${invoiceId} deleted`);
  };

  const taxAmount = invoice.subtotal * (invoice.tax / 100);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6 print:p-0">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div className="space-y-1">
          <Link
            to="/invoices"
            className="group inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            />
            Back to Invoices
          </Link>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              {invoice.invoiceNumber}
            </h1>
            <Badge
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border-transparent capitalize ${
                status === "Paid"
                  ? "bg-primary/10 text-primary hover:bg-primary/10"
                  : status === "Unpaid"
                    ? "bg-accent/10 text-accent hover:bg-accent/10"
                    : "bg-destructive/10 text-destructive hover:bg-destructive/10"
              }`}
            >
              {status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status !== "Paid" && (
            <Button size="sm" onClick={handleMarkPaid} className="h-9">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="mr-1.5 size-4"
              />
              Mark Paid
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleRecordPayment}
            className="h-9 text-xs"
          >
            <HugeiconsIcon
              icon={Dollar01Icon}
              className="mr-1.5 size-4 text-muted-foreground"
            />
            Record Payment
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
            className="h-9 text-xs"
          >
            <HugeiconsIcon
              icon={Download01Icon}
              className="mr-1.5 size-4 text-muted-foreground"
            />
            Print / PDF
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem className="text-xs cursor-pointer">
                <HugeiconsIcon
                  icon={PencilEdit01Icon}
                  className="mr-2 size-3.5 text-muted-foreground"
                />
                Edit Invoice
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-xs cursor-pointer"
                onClick={handleDuplicate}
              >
                <HugeiconsIcon
                  icon={Copy01Icon}
                  className="mr-2 size-3.5 text-muted-foreground"
                />
                Duplicate Invoice
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-xs cursor-pointer"
                onClick={handleSendReminder}
              >
                <HugeiconsIcon
                  icon={SentIcon}
                  className="mr-2 size-3.5 text-muted-foreground"
                />
                Send Reminder
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-xs text-destructive cursor-pointer focus:bg-destructive/5 focus:text-destructive"
                onClick={handleDelete}
              >
                <HugeiconsIcon icon={Delete01Icon} className="mr-2 size-3.5" />
                Delete Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Invoice Document Card */}
      <div className="bg-card text-card-foreground rounded-xl border border-border/80 shadow-sm overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black">
        <div className="p-6 sm:p-10 md:p-14 space-y-8 print:p-0">
          {/* Document Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between pb-8 border-b border-border/40">
            {/* Sender / Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <img
                  src={logo}
                  alt="Polypous Logo"
                  className="w-7 h-7 object-contain"
                />
                <span className="text-lg font-bold tracking-tight text-foreground print:text-black">
                  Polypous
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground print:text-black">
                  {invoice?.fullName}
                </p>
                <p className="text-xs text-muted-foreground print:text-gray-500">
                  Freelancer
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    className="size-3.5 text-muted-foreground/80"
                  />
                  {invoice?.email}
                </p>
              </div>
            </div>

            {/* Invoice Info */}
            <div className="text-left sm:text-right space-y-3">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
                  INVOICE
                </p>
                <p className="text-xl font-black tracking-tight text-foreground print:text-black mt-0.5">
                  {invoice.invoiceNumber}
                </p>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground print:text-gray-500">
                <p className="flex items-center sm:justify-end gap-1.5">
                  <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
                  <span>Issued: </span>
                  <span className="font-medium text-foreground print:text-black">
                    {format(invoice?.issueDate, "MMM dd, yyyy")}
                  </span>
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
                  <span>Due: </span>
                  <span className="font-medium text-foreground print:text-black">
                    {format(invoice?.dueDate, "MMM dd, yyyy")}
                  </span>
                </p>
              </div>

              <div className="pt-2 border-t border-border/40 inline-block text-left sm:text-right">
                <p className="text-[9px] font-bold tracking-wider uppercase text-muted-foreground print:text-gray-500">
                  BALANCE DUE
                </p>
                <p className="text-lg font-bold text-foreground print:text-black">
                  ${invoice?.total}
                </p>
              </div>
            </div>
          </div>

          {/* Party & Project details */}
          <div className="grid gap-6 sm:grid-cols-2 py-2">
            {/* Bill To */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
                BILL TO
              </p>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground print:text-black">
                  {invoice?.client.name}
                </p>
                <div className="space-y-1 text-xs text-muted-foreground print:text-gray-500">
                  <p className="flex items-center gap-1.5">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      className="size-3.5 text-muted-foreground/80"
                    />
                    {invoice?.client.email}
                  </p>
                  {invoice?.client.phone && (
                    <p className="flex items-center gap-1.5">
                      <HugeiconsIcon
                        icon={Call02Icon}
                        className="size-3.5 text-muted-foreground/80"
                      />
                      {invoice?.client.phone}
                    </p>
                  )}
                  {invoice?.client.address && (
                    <p className="flex items-start gap-1.5">
                      <HugeiconsIcon
                        icon={Location01Icon}
                        className="size-3.5 text-muted-foreground/80 mt-0.5"
                      />
                      <span>{invoice?.client.address}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Project description */}
            {/* <div className="space-y-2.5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
                PROJECT SUMMARY
              </p>
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-foreground print:text-black text-sm">
                  Professional branding & logo design
                </p>
                <p className="text-muted-foreground print:text-gray-500 leading-relaxed font-normal">
                  Professional branding and logo design services for Local
                  Coffee Shop. Includes concept development, revisions, and
                  final asset delivery.
                </p>
              </div>
            </div> */}
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto pt-2">
            <Table>
              <TableHeader className="bg-muted/30 border-b border-border/40 print:bg-gray-100">
                <TableRow>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider h-9">
                    Description
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-bold uppercase tracking-wider w-16 h-9">
                    Qty
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-bold uppercase tracking-wider w-28 h-9">
                    Unit Price
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-bold uppercase tracking-wider w-28 h-9">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice?.items.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-transparent border-b border-border/30"
                  >
                    <TableCell className="font-medium text-xs text-foreground print:text-black py-4">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground print:text-gray-600 py-4">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground print:text-gray-600 py-4">
                      ${item.unitPrice}
                    </TableCell>
                    <TableCell className="text-right text-xs font-semibold text-foreground print:text-black py-4">
                      ${item.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Total Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-full sm:max-w-xs space-y-3">
              <div className="flex justify-between text-xs text-muted-foreground print:text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-foreground print:text-black">
                  ${invoice?.subtotal}
                </span>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground print:text-gray-600">
                <span>Tax (10%)</span>
                <span className="font-medium text-foreground print:text-black">
                  ${taxAmount}
                </span>
              </div>

              <Separator className="bg-border/40" />

              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-lg p-3 flex justify-between items-center text-primary print:bg-gray-100 print:text-black print:border-gray-200">
                <span className="text-xs font-semibold">Total Amount</span>
                <span className="text-base font-bold">${invoice?.total}</span>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          {invoice.notes && (
            <div className="pt-6 border-t border-border/40 space-y-2">
              <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
                NOTES & TERMS
              </p>
              <p className="text-xs text-muted-foreground print:text-gray-500 leading-relaxed max-w-2xl font-normal">
                Please remit payment within 14 days of issue date. Standard tax
                rate of 10% is applied to all branding services. For bank
                transfers, please reference the invoice number {invoiceId}.
                Thank you for your business!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
