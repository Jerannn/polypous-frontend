import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHeader } from "@/components/ui/table";

type TableLoadingStateProps = {
  title: string;
  header: ReactNode;
  skeletonRow: ReactNode;
};

export default function TableLoadingState({
  title,
  header,
  skeletonRow,
}: TableLoadingStateProps) {
  return (
    <Card className="mt-10">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>{header}</TableHeader>
          <TableBody>{skeletonRow}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
