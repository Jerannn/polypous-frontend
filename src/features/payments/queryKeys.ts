import type { PaymentQueryPayload } from "./types";

export const paymentKeys = {
  all: ["payments"] as const,
  stats: () => [...paymentKeys.all, "stats"] as const,
  list: (params: PaymentQueryPayload) => [...paymentKeys.all, params] as const,
};
