import { z } from "zod";

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/utils/constants";

export const paymentsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce
    .number()
    .min(1)
    .max(MAX_PAGE_SIZE, `Limit must not exceed ${DEFAULT_PAGE_SIZE}`)
    .default(DEFAULT_PAGE_SIZE)
    .catch(DEFAULT_PAGE_SIZE),
  search: z.string().trim().optional().default(""),
});
