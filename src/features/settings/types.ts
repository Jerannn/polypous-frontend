import { z } from "zod";

import type {
  businessSchema,
  profileSchema,
  verifyPasswordSchema,
} from "./schema";

export type ProfileInput = z.infer<typeof profileSchema>;
export type BusinessInput = z.infer<typeof businessSchema>;
export type VerifyPasswordInput = z.infer<typeof verifyPasswordSchema>;

export type Business = BusinessInput & {
  id: string;
  userId: string;
  brandUrl: string | null;
  publicId: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};
