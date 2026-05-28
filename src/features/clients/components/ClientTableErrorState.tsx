import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AlertCircle } from "lucide-react";

export default function ClientTableErrorState() {
  return (
    <Card className="mt-10">
      <CardContent className="pt-6">
        <Empty>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Error Loading Clients</EmptyTitle>
            <EmptyDescription>
              Something went wrong while trying to fetch the client list. Please
              try again.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardContent>
    </Card>
  );
}
