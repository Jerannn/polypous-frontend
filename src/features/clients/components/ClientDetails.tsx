import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Banknote,Mail, MapPin, Phone, ScrollText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useCurrencyFormatter from "@/hooks/useCurrencyFormatter";

import type { Client } from "../types";

type ClientDetailsProps = {
  client: Client;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ClientDetails({
  client,
  isOpen,
  onOpenChange,
}: ClientDetailsProps) {
  const formatCurrency = useCurrencyFormatter();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <ScrollArea className="h-full">
          <SheetHeader>
            <SheetTitle className="capitalize">{client.name}</SheetTitle>
            <SheetDescription>
              Client details and invoice history
            </SheetDescription>
          </SheetHeader>
          <div className="px-6 space-y-7">
            <div>
              <h2 className="font-medium">Contact Information</h2>
              <Item
                variant="default"
                size="xs"
                className="text-muted-foreground ps-0 py-1"
              >
                <ItemMedia>
                  <Mail className="size-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{client.email}</ItemTitle>
                </ItemContent>
              </Item>

              <Item
                variant="default"
                size="xs"
                className="text-muted-foreground ps-0 py-1"
              >
                <ItemMedia>
                  <Phone className="size-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    {client.phone ? client.phone : "No phone"}
                  </ItemTitle>
                </ItemContent>
              </Item>

              <Item
                variant="default"
                size="xs"
                className="text-muted-foreground ps-0 py-1"
              >
                <ItemMedia>
                  <MapPin className="size-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>
                    {client.address ? client.address : "No address"}
                  </ItemTitle>
                </ItemContent>
              </Item>
            </div>

            <div className="flex gap-2">
              <Item variant="muted" size="xs">
                <ItemMedia variant="image">
                  <ScrollText />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-lg text-foreground font-bold">
                    {client.invoiceCount}
                  </ItemTitle>
                  <ItemDescription>Total Invoices</ItemDescription>
                </ItemContent>
              </Item>

              <Item variant="muted" size="xs">
                <ItemMedia variant="image">
                  <Banknote />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-lg text-foreground font-bold">
                    {formatCurrency(client.totalPaid)}
                  </ItemTitle>
                  <ItemDescription>Total Paid</ItemDescription>
                </ItemContent>
              </Item>
            </div>

            <div>
              <Card className="ring-0 p-0 rounded-none">
                <CardHeader className="p-0">
                  <CardTitle className="text-xs">Invoice History</CardTitle>
                  <CardAction>
                    <Button variant="link" size="sm" asChild>
                      <Link
                        to="/invoices"
                        search={{
                          page: 1,
                          limit: 10,
                          search: client.name,
                        }}
                      >
                        View All
                      </Link>
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="p-0">
                  {client.invoicesHistory.map((invoice) => (
                    <Item variant="muted" size="xs" key={invoice.invoiceNumber}>
                      <ItemContent className="flex-row justify-between gap-2">
                        <div>
                          <ItemTitle className="text-foreground font-bold">
                            {invoice.invoiceNumber}
                          </ItemTitle>
                          <ItemDescription>
                            {format(invoice.dueDate, "yyyy-MM-dd")}
                          </ItemDescription>
                        </div>

                        <div className="flex flex-col items-end">
                          <ItemDescription className="text-foreground font-bold">
                            {formatCurrency(invoice.total)}
                          </ItemDescription>
                          <ItemDescription className="uppercase">
                            {invoice.status}
                          </ItemDescription>
                        </div>
                      </ItemContent>
                    </Item>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="pb-6">
              <h2 className="font-medium">Notes</h2>
              <p className="text-xs text-muted-foreground">
                {client.notes ? client.notes : "No notes available."}
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
