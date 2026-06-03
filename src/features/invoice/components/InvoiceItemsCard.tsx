import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useInvoiceForm } from "../InvoiceFormContext";
import InvoiceItemField from "./InvoiceItemField";

export default function InvoiceItemsCard() {
  const { onAddItem, fields, isSubmitting } = useInvoiceForm();
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
            disabled={isSubmitting}
            onClick={onAddItem}
          >
            <Plus />
            Add Item
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {fields.fields.map((field, index) => (
          <InvoiceItemField key={field.id} index={index} />
        ))}
      </CardContent>
    </Card>
  );
}
