import { z } from "zod";

import type { invoiceSchema } from "./schema";

export type Invoice = z.infer<typeof invoiceSchema>;
