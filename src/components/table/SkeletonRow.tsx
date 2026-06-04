import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface SkeletonRowProps {
  type?: "client" | "invoice" | "generic";
  rowCount?: number;
  columnCount?: number;
}

export default function SkeletonRow({
  type = "generic",
  rowCount = 5,
  columnCount = 5,
}: SkeletonRowProps) {
  const renderClientCells = (rowIndex: number) => {
    const nameWidth = rowIndex % 2 === 0 ? "w-28" : "w-36";
    const emailWidth = rowIndex % 2 === 0 ? "w-36" : "w-44";
    const phoneWidth = rowIndex % 2 === 0 ? "w-24" : "w-28";
    const addressWidth = rowIndex % 2 === 0 ? "w-40" : "w-32";

    return (
      <>
        {/* Name and Email */}
        <TableCell className="max-w-60">
          <div className="flex flex-col gap-1.5 py-1">
            <Skeleton className={`h-4 ${nameWidth}`} />
            <Skeleton className={`h-3.5 ${emailWidth}`} />
          </div>
        </TableCell>

        {/* Contact info: Phone and Address */}
        <TableCell className="max-w-100">
          <div className="flex flex-col gap-1.5 py-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
              <Skeleton className={`h-3.5 ${phoneWidth}`} />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5 rounded-full shrink-0" />
              <Skeleton className={`h-3.5 ${addressWidth}`} />
            </div>
          </div>
        </TableCell>

        {/* Invoice Count */}
        <TableCell className="text-center">
          <div className="flex justify-center py-1">
            <Skeleton className="h-4 w-8" />
          </div>
        </TableCell>

        {/* Total Paid */}
        <TableCell className="text-center">
          <div className="flex justify-center py-1">
            <Skeleton className="h-4 w-14 bg-primary/10" />
          </div>
        </TableCell>

        {/* Unpaid Balance */}
        <TableCell className="text-center">
          <div className="flex justify-center py-1">
            <Skeleton className="h-4 w-14 bg-accent/10" />
          </div>
        </TableCell>

        {/* Actions */}
        <TableCell className="flex items-center justify-end text-right space-x-3 py-3">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </TableCell>
      </>
    );
  };

  const renderInvoiceCells = (rowIndex: number) => {
    const invoiceNumWidth = rowIndex % 2 === 0 ? "w-16" : "w-20";
    const clientWidth = rowIndex % 2 === 0 ? "w-28" : "w-32";
    const amountWidth = rowIndex % 2 === 0 ? "w-12" : "w-14";
    const statusBg =
      rowIndex % 3 === 0
        ? "bg-primary/10"
        : rowIndex % 3 === 1
          ? "bg-accent/10"
          : "bg-destructive/10";

    return (
      <>
        {/* Invoice # */}
        <TableCell className="max-w-60 font-medium">
          <Skeleton className={`h-4 ${invoiceNumWidth} py-1`} />
        </TableCell>

        {/* Client */}
        <TableCell className="max-w-100">
          <Skeleton className={`h-4 ${clientWidth} py-1`} />
        </TableCell>

        {/* Issue Date */}
        <TableCell className="text-center">
          <div className="flex justify-center py-1">
            <Skeleton className="h-4 w-24" />
          </div>
        </TableCell>

        {/* Due Date */}
        <TableCell className="text-center">
          <div className="flex justify-center py-1">
            <Skeleton className="h-4 w-24" />
          </div>
        </TableCell>

        {/* Amount */}
        <TableCell className="text-center font-medium">
          <div className="flex justify-center py-1">
            <Skeleton className={`h-4 ${amountWidth}`} />
          </div>
        </TableCell>

        {/* Status */}
        <TableCell className="text-center">
          <div className="flex justify-center py-1">
            <Skeleton className={`h-5 w-16 rounded-full ${statusBg}`} />
          </div>
        </TableCell>

        {/* Actions */}
        <TableCell className="flex items-center justify-end text-right space-x-3 py-3">
          <Skeleton className="h-9 w-9 rounded-md" />
        </TableCell>
      </>
    );
  };

  const renderGenericCells = (rowIndex: number) => {
    return Array.from({ length: columnCount }).map((_, colIndex) => {
      const widths = ["w-1/2", "w-3/4", "w-2/3", "w-5/6", "w-1/3"];
      const widthClass = widths[(rowIndex + colIndex) % widths.length];
      return (
        <TableCell key={colIndex}>
          <Skeleton className={`h-4 ${widthClass}`} />
        </TableCell>
      );
    });
  };

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="hover:bg-transparent border-b">
          {type === "client"
            ? renderClientCells(rowIndex)
            : type === "invoice"
              ? renderInvoiceCells(rowIndex)
              : renderGenericCells(rowIndex)}
        </TableRow>
      ))}
    </>
  );
}
