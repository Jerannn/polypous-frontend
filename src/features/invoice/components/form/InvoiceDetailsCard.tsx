import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import InvoiceDetailsForm from "./InvoiceDetailsForm";

export default function InvoiceDetailsCard() {
  return (
    <Card className="bg-transparent ring-0">
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>
          Manage client information, dates, and billing settings for this
          invoice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InvoiceDetailsForm />
      </CardContent>
    </Card>
  );
}
