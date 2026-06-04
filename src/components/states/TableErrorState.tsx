import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type TableErrorStateProps = {
  title: string;
  description: string;
  onRetry?: () => void;
};

export default function TableErrorState({
  title,
  description,
  onRetry,
}: TableErrorStateProps) {
  return (
    <Card className="mt-10 ring-0 bg-transparent">
      <CardContent className="pt-6">
        <Empty>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
          {onRetry && (
            <Button type="button" variant="outline" onClick={onRetry}>
              Try again
            </Button>
          )}
        </Empty>
      </CardContent>
    </Card>
  );
}
