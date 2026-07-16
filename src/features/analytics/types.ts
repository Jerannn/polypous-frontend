import { z } from "zod";

import type { filterSchema } from "./schema";

type StatValues = {
  total: number;
  current: number;
  previous: number;
  growth: number;
  period: string;
};

export type Filter = z.infer<typeof filterSchema>;

export type Stats = {
  revenue: StatValues;
  outstanding: StatValues;
  clients: StatValues;
  invoices: StatValues;
};

export type IncomeTrend = {
  period: string;
  total: number;
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
  incomeTrend: IncomeTrend[];
  invoiceStatus: InvoiceStatus[];
  topClients: TopClient[];
};
