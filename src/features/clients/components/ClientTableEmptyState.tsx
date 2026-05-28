import { TableRow, TableCell } from "@/components/ui/table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserX } from "lucide-react";

export default function ClientTableEmptyState() {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={100} className="py-10">
        <Empty className="border-none">
          <EmptyMedia variant="icon">
            <UserX className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No clients found</EmptyTitle>
            <EmptyDescription>
              Try adding a new client or adjusting your search filters.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
}
