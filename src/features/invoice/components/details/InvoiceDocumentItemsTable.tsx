import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

import { useInvoiceDetails } from "../context/InvoiceDetailsContext";

export default function InvoiceDocumentItemsTable() {
  const { invoice } = useInvoiceDetails();
  const formatCurrency = useCurrencyFormatter();

  return (
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
              {formatCurrency(item.unitPrice)}
            </TableCell>
            <TableCell className="text-right text-xs font-semibold text-foreground print:text-black py-4">
              {formatCurrency(item.total)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
