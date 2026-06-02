import { z } from "zod";

import type { invoiceSchema } from "./schema";

export type Invoice = z.infer<typeof invoiceSchema>;
export type Options = Record<string, string>[];

export type Cursor = {
  id: string;
  createdAt: string;
} | null;
