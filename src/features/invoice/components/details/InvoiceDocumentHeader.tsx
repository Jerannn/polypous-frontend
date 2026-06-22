import { format } from "date-fns";

import logo from "@/assets/img/logo.svg";
import { CardHeader } from "@/components/ui/card";

import { useInvoiceDetails } from "../context/InvoiceDetailsContext";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

export default function InvoiceDocumentHeader() {
  const { invoice } = useInvoiceDetails();
  const formatCurrency = useCurrencyFormatter();

  return (
    <CardHeader className="px-0">
      <img src={logo} alt="Polypous Logo" className="w-7 h-7 object-contain" />
      <div className="text-left sm:text-right space-y-1">
        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground print:text-gray-500">
          INVOICE
        </p>
        <p className="text-xl font-black tracking-tight text-foreground print:text-black mt-0.5 mb-2">
          {invoice.invoiceNumber}
        </p>

        <p className="flex items-center sm:justify-end gap-1.5 text-muted-foreground text-xs">
          <span>Issued: </span>
          <span className="font-medium text-foreground print:text-black">
            {format(invoice?.issueDate, "MMM dd, yyyy")}
          </span>
        </p>
        <p className="flex items-center sm:justify-end gap-1.5 text-muted-foreground text-xs">
          <span>Due: </span>
          <span className="font-medium text-foreground print:text-black">
            {format(invoice?.dueDate, "MMM dd, yyyy")}
          </span>
        </p>

        <p className="text-[9px] font-bold tracking-wider uppercase text-muted-foreground print:text-gray-500 mt-4 mb-0">
          BALANCE DUE
        </p>
        <p className="text-lg font-bold text-foreground print:text-black">
          {formatCurrency(invoice?.balance)}
        </p>
      </div>
    </CardHeader>
  );
}
