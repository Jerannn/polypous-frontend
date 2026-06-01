import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

export default function InvoiceSummaryCard({}: Props) {
  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}
