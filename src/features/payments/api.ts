import { api } from "@/lib/apiClient";
import type { Meta } from "@/types/shared.types";

import type {
  PaymentListItem,
  PaymentQueryPayload,
  PaymentStats,
} from "./types";

export const retrievePayments = async (
  query: PaymentQueryPayload,
): Promise<{ payments: PaymentListItem[]; meta: Meta }> => {
  const params = new URLSearchParams();

  if (query.page) params.set("page", query.page.toString());
  if (query.limit) params.set("limit", query.limit.toString());
  if (query.search) params.set("search", query.search);

  const response = await api(`/payments?${params.toString()}`, {
    method: "GET",
  });

  return response.data;
};

export const retrievePaymentStats = async (): Promise<PaymentStats> => {
  const response = await api("/payments/stats", {
    method: "GET",
  });

  return response.data.stats;
};
