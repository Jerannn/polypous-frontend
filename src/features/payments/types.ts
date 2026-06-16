import { z } from "zod";

import type { paymentsQuerySchema } from "./schema";

export type PaymentQueryPayload = z.infer<typeof paymentsQuerySchema>;

export type Payment = {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod: string;
  paymentDate: Date | string;
  referenceNumber: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PaymentListItem = {
  id: string;
  paymentDate: Date | string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  paymentMethod: string;
  referenceNumber: string | null;
};

export type PaymentStats = {
  totalRevenue: string;
  monthlyRevenue: string;
  totalPayments: string;
  averagePayment: string;
};
