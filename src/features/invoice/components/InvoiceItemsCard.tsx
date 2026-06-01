import { Plus } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type InvoiceItemsCardProps = {
  onAddItem: () => void;
  children: ReactNode;
};

export default function InvoiceItemsCard({
  onAddItem,
  children,
}: InvoiceItemsCardProps) {
  return (
    <Card className="bg-transparent ring-0">
      <CardHeader>
        <CardTitle>Invoice Items</CardTitle>
        <CardDescription>
          Add and manage line items, including descriptions, quantities, and
          pricing.
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="gap-4"
            onClick={onAddItem}
          >
            <Plus />
            Add Item
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}
