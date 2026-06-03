import { api } from "@/lib/apiClient";
import type { Meta } from "@/types/shared.types";

import type {
  Cursor,
  Invoice,
  InvoiceBase,
  InvoiceQueryPayload,
  Options,
} from "./types";

export const create = async (payload: InvoiceBase): Promise<Invoice> => {
  const response = await api("/invoices", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data.invoice;
};

export const retrieve = async (
  query: InvoiceQueryPayload,
): Promise<{
  invoices: Invoice[];
  meta: Meta;
}> => {
  const params = new URLSearchParams();

  if (query.page) params.set("page", query.page.toString());
  if (query.limit) params.set("limit", query.limit.toString());
  if (query.search) params.set("search", query.search);

  const response = await api(`/invoices?${params.toString()}`, {
    method: "GET",
  });

  return response.data;
};

export const retrieveOptions = async ({
  pageParam,
  query,
}: {
  pageParam: Cursor;
  query: string;
}): Promise<{ options: Options; nextCursor: Cursor }> => {
  const params = new URLSearchParams();

  if (pageParam) {
    params.set("id", pageParam.id);
    params.set("createdAt", pageParam.createdAt);
  }
  if (query) params.set("query", query);

  const response = await api(`/clients/options?${params.toString()}`, {
    method: "GET",
  });

  return response.data;
};
