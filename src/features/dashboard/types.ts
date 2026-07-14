import type { InvoiceStatus } from "../analytics/types";

export type Stats = {
  paidCount: string;
  unpaidCount: string;
  overdueCount: string;
  totalMonthlyRevenue: string;
};

export type RecentInvoice = {
  id: string;
  invoiceNumber: string;
  status: string;
  dueDate: Date;
  total: number;
  clientName: string;
};

export type MonthlyIncome = {
  month: string;
  income: number;
};

export type Overview = {
  stats: Stats;
  monthlyIncome: MonthlyIncome[];
  invoiceStatus: InvoiceStatus[];
  recentInvoices: RecentInvoice[];
};
