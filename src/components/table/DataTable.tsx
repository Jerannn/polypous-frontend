import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table";

type DataTableProps<T> = {
  title: string;
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;

  loadingState: ReactNode;
  errorState: ReactNode;
  emptyState: ReactNode;

  header: ReactNode;
  items: T[];
  renderRow: (item: T) => ReactNode;

  pagination: ReactNode;
};

export default function DataTable<T>({
  title,
  isPending,
  isError,
  isFetching,
  loadingState,
  errorState,
  emptyState,
  header,
  items,
  renderRow,
  pagination,
}: DataTableProps<T>) {
  if (isPending || isFetching) return loadingState;
  if (isError) return errorState;

  return (
    <Card
      className={`mt-10 transition-opacity ${isFetching ? "opacity-60" : ""}`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>{header}</TableHeader>
          <TableBody>
            {items.length === 0 ? emptyState : items.map(renderRow)}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="w-full text-right hover:bg-transparent">
              <TableCell colSpan={100} className="pt-4">
                {pagination}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
