import { TableHead, TableRow } from "@/components/ui/table";

export default function InvoiceTableHeader() {
  return (
    <TableRow>
      <TableHead>Invoice #</TableHead>
      <TableHead>Client</TableHead>
      <TableHead className="text-center">Issue Date</TableHead>
      <TableHead className="text-center">Due Date</TableHead>
      <TableHead className="text-center">Amount</TableHead>
      <TableHead className="text-center">Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  );
}
