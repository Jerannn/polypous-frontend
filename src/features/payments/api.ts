import { api } from "@/lib/axios";
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

  const response = await api.get("/payments", {
    params,
  });

  return response.data.data;
};

export const retrievePaymentStats = async (): Promise<PaymentStats> => {
  const response = await api.get("/payments/stats");

  return response.data.data.stats;
};
