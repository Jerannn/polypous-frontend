import { z } from "zod";

import type { businessSchema, profileSchema } from "./schema";

export type ProfileInput = z.infer<typeof profileSchema>;
export type BusinessInput = z.infer<typeof businessSchema>;
