import { z } from "zod";

import type { invoiceQuerySchema, invoiceSchema } from "./schema";

export type InvoiceStatus = "PAID" | "UNPAID" | "OVERDUE" | "CANCELLED";
export type InvoiceBase = z.infer<typeof invoiceSchema>;
export type Options = Record<string, string>[];
export type InvoiceQueryPayload = z.infer<typeof invoiceQuerySchema>;
export type Cursor = {
  id: string;
  createdAt: string;
} | null;

export type Invoice = Omit<InvoiceBase, "items" | "clientId"> & {
  id: string;
  userId: string;
  invoiceNumber: string;
  clientName: string;
  status: InvoiceStatus;
  subtotal: number;
  total: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};
