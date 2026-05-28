import { TableHead, TableRow } from "@/components/ui/table";

export default function ClientTableHeader() {
  return (
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Contact</TableHead>
      <TableHead className="text-center">Invoices</TableHead>
      <TableHead className="text-center">Total Paid</TableHead>
      <TableHead className="text-center">Unpaid Balance</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  );
}
