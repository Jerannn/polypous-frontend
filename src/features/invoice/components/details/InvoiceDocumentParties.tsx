import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import { useInvoiceDetails } from "../context/InvoiceDetailsContext";

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
            <ItemDescription className="capitalize">
              {invoice?.freelancer.fullName}
            </ItemDescription>

            <ItemDescription>{invoice?.freelancer.email}</ItemDescription>
          </div>
        </ItemContent>
      </Item>

      <Item variant="default" size="xs" className="items-start">
        <ItemContent>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Bill To
          </p>

          <ItemTitle className="text-base">{invoice?.client.name}</ItemTitle>

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
