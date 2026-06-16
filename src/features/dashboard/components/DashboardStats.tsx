import StatsCard from "@/components/StatsCard";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, BadgeDollarSign, Clock, OctagonAlert } from "lucide-react";

const stats = {
  totalIncome: "999.99",
  paidInvoices: "28",
  unpaidInvoices: "9",
  overdueInvoices: "3",
};

export default function DashboardStats() {
  return (
    <Card className="bg-transparent ring-0">
      <CardContent className="flex justify-start gap-4 px-0">
        <StatsCard
          title={"Total Income"}
          value={`$${stats?.totalIncome || "0"}`}
          description={"This month"}
          icon={BadgeDollarSign}
        />

        <StatsCard
          title={"Paid Invoices"}
          value={`${stats?.paidInvoices || "0"}`}
          description={"Successfully paid"}
          icon={BadgeCheck}
        />

        <StatsCard
          title={"Unpaid Invoices"}
          value={stats?.unpaidInvoices || "0"}
          description={"Awaiting payment"}
          icon={Clock}
        />

        <StatsCard
          title={"Overdue Invoices"}
          value={`${stats?.overdueInvoices || "0"}`}
          description={"Needs attention"}
          icon={OctagonAlert}
        />
      </CardContent>
    </Card>
  );
}
