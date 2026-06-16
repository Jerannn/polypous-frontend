import { format } from "date-fns";
import { CreditCard } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { useInvoiceDetails } from "../context/InvoiceDetailsContext";

export default function PaymentHistory() {
  const { invoice, currency } = useInvoiceDetails();

  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between items-center p-0">
        <CardTitle>Payment History</CardTitle>
        <CardDescription className="text-xs">
          {invoice.payments.length} records
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-114 overflow-auto no-scrollbar space-y-2 p-0">
        {invoice.payments.map((payment) => (
          <Item variant="muted" className="bg-primary/10" key={payment.id}>
            <ItemMedia variant="icon">
              <CreditCard />
            </ItemMedia>
            <ItemContent className="flex-row justify-between gap-0">
              <div>
                <ItemTitle>
                  {currency} {payment.amount}
                </ItemTitle>
                {/* <ItemDescription className="capitalize text-xs">
                  {payment.paymentMethod}
                </ItemDescription>
                <span className="text-muted-foreground text-xs">
                  {payment.referenceNumber}
                </span> */}
              </div>

              <span className="text-muted-foreground text-xs">
                {format(payment.paymentDate, "MMM dd, yyyy")}
              </span>
            </ItemContent>
          </Item>
        ))}
      </CardContent>
    </Card>
  );
}
