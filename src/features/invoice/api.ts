import { format } from "date-fns";

import { api } from "@/lib/axios";
import type { Meta } from "@/types/shared.types";

import type {
  Cursor,
  Invoice,
  InvoiceBase,
  InvoiceListItem,
  InvoiceQueryPayload,
  InvoiceWithItemsAndClient,
  Options,
  RecordPaymentPayload,
} from "./types";

export const createInvoice = async (payload: InvoiceBase): Promise<Invoice> => {
  const response = await api.post("/invoices", payload);

  return response.data.data.invoice;
};

export const updateInvoice = async (
  payload: InvoiceBase & { id: string },
): Promise<void> => {
  const { id, ...restPayload } = payload;

  await api.patch(`/invoices/${id}`, restPayload);
};

export const retrieveInvoices = async (
  query: InvoiceQueryPayload,
): Promise<{
  invoices: InvoiceListItem[];
  meta: Meta;
}> => {
  const params = new URLSearchParams();

  if (query.page) params.set("page", query.page.toString());
  if (query.limit) params.set("limit", query.limit.toString());
  if (query.search) params.set("search", query.search);

  const response = await api.get("/invoices", {
    params,
  });

  return response.data.data;
};

export const retrieveInvoice = async (
  id: string,
): Promise<InvoiceWithItemsAndClient> => {
  const response = await api.get(`/invoices/${id}`);

  return response.data.data.invoice;
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

  const response = await api.get("/clients/options", {
    params,
  });

  return response.data.data;
};

export const deleteInvoice = async (id: string): Promise<boolean> => {
  const response = await api.delete(`/invoices/${id}`);

  return response.data.isDeleted;
};

export const recordPayment = async (
  invoiceId: string,
  payload: RecordPaymentPayload,
): Promise<void> => {
  await api.post(`/payments/${invoiceId}`, {
    ...payload,
    paymentDate: format(payload.paymentDate, "yyyy-MM-dd"),
  });
};

export const downloadInvoicePDF = async (id: string): Promise<Blob> => {
  const response = await api.get(`/invoices/${id}/pdf`, {
    responseType: "blob",
  });

  return response.data;
};
