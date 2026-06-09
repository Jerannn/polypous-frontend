import { BadgeDollarSign, CalendarDays, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function PaymentContainer() {
  return (
    <div>
      <Card className="bg-transparent ring-0">
        <CardContent className="flex gap-4">
          <Item variant="muted" className="max-w-56 w-full">
            <ItemContent>
              <ItemTitle className="text-muted-foreground uppercase">
                Total Revenue
              </ItemTitle>
              <span className="text-3xl font-semibold tabular-nums">
                $1,999
              </span>
              <ItemDescription>All time</ItemDescription>
            </ItemContent>
            <ItemMedia variant="icon">
              <BadgeDollarSign />
            </ItemMedia>
          </Item>

          <Item variant="muted" className="max-w-56 w-full">
            <ItemContent>
              <ItemTitle className="text-muted-foreground uppercase">
                This Month
              </ItemTitle>
              <span className="text-3xl font-semibold tabular-nums">$578</span>
              <ItemDescription>1 payments</ItemDescription>
            </ItemContent>
            <ItemMedia variant="icon">
              <CalendarDays />
            </ItemMedia>
          </Item>

          <Item variant="muted" className="max-w-56 w-full">
            <ItemContent>
              <ItemTitle className="text-muted-foreground uppercase">
                Total Payments
              </ItemTitle>
              <span className="text-3xl font-semibold tabular-nums">7</span>
              <ItemDescription>Transactions</ItemDescription>
            </ItemContent>
            <ItemMedia variant="icon">
              <Wallet />
            </ItemMedia>
          </Item>

          <Item variant="muted" className="max-w-56 w-full">
            <ItemContent>
              <ItemTitle className="text-muted-foreground uppercase">
                Average Payment
              </ItemTitle>
              <span className="text-3xl font-semibold tabular-nums">
                $4,400
              </span>
              <ItemDescription>Per transaction</ItemDescription>
            </ItemContent>
            <ItemMedia variant="icon">
              <BadgeDollarSign />
            </ItemMedia>
          </Item>
        </CardContent>
      </Card>
    </div>
  );
}
