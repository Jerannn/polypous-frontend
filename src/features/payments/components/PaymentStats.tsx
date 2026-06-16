import { BadgeDollarSign, CalendarDays, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import StatsCard from "../../../components/StatsCard";
import useRetrievePaymentStats from "../hooks/use-retrieve-payment-stats";
import { format } from "date-fns";

export default function PaymentStats() {
  const { stats } = useRetrievePaymentStats();

  // to follow
  return (
    <Card className="bg-transparent ring-0">
      <CardContent className="flex justify-start gap-4 px-0">
        <StatsCard
          title={"Total Revenue"}
          value={`$${stats?.totalRevenue || "0"}`}
          description={"All-time earnings"}
          icon={BadgeDollarSign}
        />

        <StatsCard
          title={"This Month"}
          value={`$${stats?.monthlyRevenue || "0"}`}
          description={format(new Date(), "MMM yyyy")}
          icon={CalendarDays}
        />

        <StatsCard
          title={"Total Payments"}
          value={stats?.totalPayments || "0"}
          description={"All-time transactions"}
          icon={Wallet}
        />

        <StatsCard
          title={"Average Payment"}
          value={`$${stats?.averagePayment || "0"}`}
          description={"Per transaction"}
          icon={BadgeDollarSign}
        />
      </CardContent>
    </Card>
  );
}
