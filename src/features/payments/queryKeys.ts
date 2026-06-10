import type { PaymentQueryPayload } from "./types";

export const paymentKeys = {
  all: ["payments"] as const,
  list: (params: PaymentQueryPayload) => [...paymentKeys.all, params] as const,
  //   detail: (id: string) => [...invoiceKeys.all, id] as const,
};
