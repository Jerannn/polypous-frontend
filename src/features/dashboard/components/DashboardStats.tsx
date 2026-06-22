import { BadgeCheck, BadgeDollarSign, Clock, OctagonAlert } from "lucide-react";

import StatsCard from "@/components/StatsCard";
import { Card, CardContent } from "@/components/ui/card";

import type { Stats } from "../types";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

type DashboardStatsProps = {
  stats: Stats;
};

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const formatCurrency = useCurrencyFormatter();

  return (
    <Card className="bg-transparent ring-0">
      <CardContent className="flex justify-start gap-4 px-0">
        <StatsCard
          title={"Total Income"}
          value={`${formatCurrency(Number(stats?.totalMonthlyRevenue)) || "0"}`}
          description={"This month"}
          icon={BadgeDollarSign}
        />

        <StatsCard
          title={"Paid Invoices"}
          value={`${stats?.paidCount || "0"}`}
          description={"Successfully paid"}
          icon={BadgeCheck}
        />

        <StatsCard
          title={"Unpaid Invoices"}
          value={stats?.unpaidCount || "0"}
          description={"Awaiting payment"}
          icon={Clock}
        />

        <StatsCard
          title={"Overdue Invoices"}
          value={`${stats?.overdueCount || "0"}`}
          description={"Needs attention"}
          icon={OctagonAlert}
        />
      </CardContent>
    </Card>
  );
}
