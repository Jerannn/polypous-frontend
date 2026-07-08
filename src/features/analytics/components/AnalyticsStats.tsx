import { BadgeDollarSign, CalendarDays, UsersRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

import StatsCard from "../../../components/StatsCard";

export default function AnalyticsStats() {
  //   const { stats } = useRetrievePaymentStats();
  const formatCurrency = useCurrencyFormatter();

  // to follow
  return (
    <Card className="bg-transparent ring-0">
      <CardContent className="flex justify-start gap-4 px-0">
        <StatsCard
          title={"Total Revenue"}
          //   value={`${formatCurrency(Number(stats?.totalRevenue ?? "0"))}`}
          value={`${formatCurrency(0)}`}
          description={"📈 13.3% vs last month"}
          icon={BadgeDollarSign}
        />

        <StatsCard
          title={"Avg Monthly Revenue"}
          //   value={`${formatCurrency(Number(stats?.monthlyRevenue ?? "0"))}`}
          value={`${formatCurrency(0)}`}
          description={"Over 4 months"}
          icon={CalendarDays}
        />

        <StatsCard
          title={"Total Clients"}
          //   value={stats?.totalPayments || "0"}
          value={"5"}
          description={"Active clients"}
          icon={UsersRound}
        />

        <StatsCard
          title={"Total Invoices"}
          //   value={stats?.totalPayments || "0"}
          value={"7"}
          description={"All time"}
          icon={BadgeDollarSign}
        />
      </CardContent>
    </Card>
  );
}
