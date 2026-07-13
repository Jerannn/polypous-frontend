import { z } from "zod";

export const filterSchema = z.object({
  date: z.object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  }),
});
