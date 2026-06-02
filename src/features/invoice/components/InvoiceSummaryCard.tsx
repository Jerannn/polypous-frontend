import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function InvoiceSummaryCard() {
  return (
    <Card className="w-full lg:max-w-sm">
      <CardHeader>
        <CardTitle>Invoice Summary</CardTitle>
        <CardDescription>Automatically calculated totals</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-bold">$1,000.00</span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span className="font-bold">$100.00</span>
          </div>
        </div>

        <Separator />

        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex flex-col items-center justify-between">
            <span className="font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-primary">$1,100.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
