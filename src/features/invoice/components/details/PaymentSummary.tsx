import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import { useInvoiceDetails } from "../context/InvoiceDetailsContext";
import RecordPayment from "../RecordPayment";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

export default function PaymentSummary() {
  const { invoice } = useInvoiceDetails();
  const formatCurrency = useCurrencyFormatter();

  const paymentPercentage = (invoice?.amountPaid / invoice?.total) * 100;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
        {/* <CardAction>
          <Button variant="outline" size="sm" className="text-foreground">
            <CircleCheckBig />
            Mark as Paid
          </Button>
        </CardAction> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <Item className="p-0">
          <ItemContent className="gap-0">
            <ItemTitle>
              {invoice?.balance ? "Balance Due" : "Total Paid"}
            </ItemTitle>
            <ItemDescription className="text-2xl font-bold text-foreground">
              {formatCurrency(
                invoice?.balance ? invoice?.balance : invoice?.amountPaid,
              )}
            </ItemDescription>
            <Badge variant="outline">
              <span
                className={cn(
                  "mr-1 h-2 w-2 rounded-full",
                  invoice.status === "PAID"
                    ? "bg-primary"
                    : invoice.status === "UNPAID"
                      ? "bg-accent"
                      : "bg-destructive",
                )}
              ></span>
              {invoice?.status}
            </Badge>
          </ItemContent>
        </Item>

        <Field className="w-full max-w-sm">
          <Progress value={paymentPercentage} />
          <FieldLabel>
            <span>
              {formatCurrency(invoice?.amountPaid)} /{" "}
              {formatCurrency(invoice?.total)}
            </span>
            <span className="ml-auto">{paymentPercentage.toFixed(2)}%</span>
          </FieldLabel>
        </Field>

        {/* <div className="flex gap-2">
          <Item variant="muted" className="bg-primary/10">
            <ItemContent className="gap-0">
              <ItemDescription>Payments</ItemDescription>
              <ItemTitle className="text-foreground font-bold">0</ItemTitle>
            </ItemContent>
          </Item>

          <Item variant="muted" className="bg-primary/10">
            <ItemContent className="gap-0">
              <ItemDescription>Remaining</ItemDescription>
              <ItemTitle className="text-foreground font-bold">
                USD 1,200
              </ItemTitle>
            </ItemContent>
          </Item>
        </div> */}

        {invoice?.balance > 0 && <RecordPayment />}
      </CardContent>
    </Card>
  );
}
