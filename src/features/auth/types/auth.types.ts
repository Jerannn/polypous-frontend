import { z } from "zod";
import { registerSchema } from "../schema/auth.schema";

export type RegisterForm = z.infer<typeof registerSchema>;

export type Users = {
  readonly id: string;
  fullName: string;
  email: string;
  passwordHash: string | undefined;
  currency: string;
  avatarUrl: string | null;
  publicId: string | null;
  created_at: Date;
  updated_at: Date;
};

export type SuccessResponse<T> = {
  status: string;
  data: T;
};
