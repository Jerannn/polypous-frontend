import { z } from "zod";

import type {
  businessSchema,
  profileSchema,
  verifyPasswordSchema,
} from "./schema";

export type ProfileInput = z.infer<typeof profileSchema>;
export type BusinessInput = z.infer<typeof businessSchema>;
export type VerifyPasswordInput = z.infer<typeof verifyPasswordSchema>;
