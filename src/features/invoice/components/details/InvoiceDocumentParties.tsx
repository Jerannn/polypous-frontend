import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import { useInvoiceDetails } from "../context/InvoiceDetailsContext";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function InvoiceDocumentParties() {
  const { invoice } = useInvoiceDetails();

  return (
    <div className="grid grid-cols-2 gap-8">
      <Item variant="default" size="xs" className="items-start">
        <ItemContent>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            From
          </p>

          <ItemTitle className="text-base">Freelancer</ItemTitle>

          <div className="mt-2">
            {!invoice?.freelancer && (
              <Button asChild variant="link" className="p-0">
                <Link to="/settings">Go to business settings</Link>
              </Button>
            )}
            {invoice?.freelancer && (
              <>
                <ItemDescription className="capitalize">
                  {invoice?.freelancer.name}
                </ItemDescription>

                <ItemDescription>{invoice?.freelancer.email}</ItemDescription>
                <ItemDescription>{invoice?.freelancer.phone}</ItemDescription>
                <ItemDescription className="line-clamp-2">
                  {invoice?.freelancer.address}
                </ItemDescription>
              </>
            )}
          </div>
        </ItemContent>
      </Item>

      <Item variant="default" size="xs" className="items-start">
        <ItemContent>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Bill To
          </p>

          <ItemTitle className="text-base capitalize">
            {invoice?.client.name}
          </ItemTitle>

          <div className="mt-2">
            <ItemDescription>{invoice?.client.email}</ItemDescription>

            {invoice?.client.phone && (
              <ItemDescription>{invoice?.client.phone}</ItemDescription>
            )}

            {invoice?.client.address && (
              <ItemDescription className="capitalize">
                {invoice?.client.address}
              </ItemDescription>
            )}
          </div>
        </ItemContent>
      </Item>
    </div>
  );
}
