import { z } from "zod";

import {
  type invoiceQuerySchema,
  type invoiceSchema,
  recordPaymentSchema,
} from "./schema";

export type InvoiceStatus = "PAID" | "UNPAID" | "OVERDUE" | "CANCELLED";
export type InvoiceBase = z.infer<typeof invoiceSchema>;
export type Options = Record<string, string>[];
export type InvoiceQueryPayload = z.infer<typeof invoiceQuerySchema>;
export type RecordPaymentPayload = z.infer<typeof recordPaymentSchema>;
export type Cursor = {
  id: string;
  createdAt: string;
} | null;

export type Invoice = {
  id: string;
  userId: string;

  invoiceNumber: string;

  issueDate: Date;
  dueDate: Date;

  notes?: string;

  status: InvoiceStatus;

  subtotal: number;
  tax: number;
  total: number;

  createdAt: Date;
  updatedAt: Date;
};

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type InvoiceClient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type InvoiceFreelancer = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type InvoicePayment = {
  id: string;
  amount: number;
  paymentMethod: string;
  referenceNumber: string | null;
  paymentDate: Date | string;
  notes: string | null;
};

export type InvoiceListItem = Invoice & { clientName: string };
export type InvoiceWithItemsAndClient = Invoice & {
  freelancer: InvoiceFreelancer;
  client: InvoiceClient;
  items: InvoiceItem[];
  payments: InvoicePayment[];
  taxAmount: number;
  amountPaid: number;
  balance: number;
};
