import { TableHead, TableRow } from "@/components/ui/table";

export default function PaymentTableHeader() {
  return (
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Invoice</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Reference</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  );
}
