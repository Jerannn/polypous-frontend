import { BadgeDollarSign, CalendarDays, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import StatsCard from "./StatsCard";

export default function PaymentStats() {
  return (
    <Card className="bg-transparent ring-0">
      <CardContent className="flex justify-between gap-4">
        <StatsCard
          title={"Total Revenue"}
          value={"$1,999"}
          description={"All time"}
          icone={BadgeDollarSign}
        />

        <StatsCard
          title={"This Month"}
          value={"$578"}
          description={"1 payments"}
          icone={CalendarDays}
        />

        <StatsCard
          title={"Total Payments"}
          value={"7"}
          description={"Transactions"}
          icone={Wallet}
        />

        <StatsCard
          title={"Average Payment"}
          value={"$4,400"}
          description={"Per transaction"}
          icone={BadgeDollarSign}
        />
      </CardContent>
    </Card>
  );
}
