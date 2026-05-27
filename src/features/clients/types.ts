import type { z } from "zod";

import type { createClientSchema, querySchema } from "./schema";

export type ClientPayload = z.infer<typeof createClientSchema>;

export type Client = ClientPayload & {
  readonly id: string;
  readonly userId: string;
  invoiceCount: number;
  totalPaid: number;
  totalUnpaid: number;
  createdAt: string;
  updatedAt: string;
};

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
};

export type QueryPayload = z.infer<typeof querySchema>;
