import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardRecentInvoices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>View and manage recent invoices.</CardDescription>
        <CardAction>
          <Button variant="outline" className="rounded-full">
            View All
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
