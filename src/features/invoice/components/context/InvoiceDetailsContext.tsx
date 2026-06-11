import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { createContext, type ReactNode, useContext } from "react";

import { invoiceQueryOptions } from "../../queries";
import type { InvoiceWithItemsAndClient } from "../../types";

const routeApi = getRouteApi("/(protected)/invoices/$invoiceId");

type InvoiceDetailsContextType = {
  invoice: InvoiceWithItemsAndClient;
  invoiceId: string;
  currency: string;
};

const InvoiceDetailsContext = createContext<
  InvoiceDetailsContextType | undefined
>(undefined);

type InvoiceDetailsProviderProps = {
  children: ReactNode;
};

export function InvoiceDetailsProvider({
  children,
}: InvoiceDetailsProviderProps) {
  const { invoiceId } = routeApi.useParams();

  const { data: invoice } = useSuspenseQuery(invoiceQueryOptions(invoiceId));

  return (
    <InvoiceDetailsContext.Provider
      value={{
        invoice,
        invoiceId,
        currency: invoice?.freelancer.currency,
      }}
    >
      {children}
    </InvoiceDetailsContext.Provider>
  );
}

export function useInvoiceDetails() {
  const context = useContext(InvoiceDetailsContext);

  if (!context) {
    throw new Error(
      "useInvoiceDetails must be used within a InvoiceDetailsProvider.",
    );
  }

  return context;
}
