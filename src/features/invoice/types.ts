import { z } from "zod";

import type { invoiceSchema } from "./schema";

export type InvoiceStatus = "PAID" | "UNPAID" | "OVERDUE" | "CANCELLED";
export type InvoiceBase = z.infer<typeof invoiceSchema>;
export type Options = Record<string, string>[];

export type Cursor = {
  id: string;
  createdAt: string;
} | null;

export type Invoice = Omit<InvoiceBase, "items"> & {
  id: string;
  userId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  subtotal: number;
  total: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};
