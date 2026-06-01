import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ReactNode } from "react";

type InvoiceDetailsCardProps = {
  children: ReactNode;
};

export default function InvoiceDetailsCard({
  children,
}: InvoiceDetailsCardProps) {
  return (
    <Card className="bg-transparent ring-0">
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>
          Manage client information, dates, and billing settings for this
          invoice.
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
