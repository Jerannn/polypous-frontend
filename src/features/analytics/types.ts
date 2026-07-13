import { z } from "zod";
import type { filterSchema } from "./schema";

export type Filter = z.infer<typeof filterSchema>;

export type Stats = {
  totalRevenue: string;
  averageMonthlyRevenue: string;
  revenueGrowthPercentage: string;
  totalClients: string;
  totalInvoices: string;
};

export type MonthlyIncome = {
  month: string;
  income: number;
};

export type InvoiceStatus = {
  status: string;
  count: number;
};

export type TopClient = {
  name: string;
  revenue: number;
};

export type Analytics = {
  stats: Stats;
  monthlyIncome: MonthlyIncome[];
  invoiceStatus: InvoiceStatus[];
  topClients: TopClient[];
};
