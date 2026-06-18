import { z } from "zod";

import type { loginSchema, registerSchema, verifyCodeSchema } from "./schema";

export type RegisterPayload = z.infer<typeof registerSchema>;
export type VerifyCodePayload = z.infer<typeof verifyCodeSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
export type VerifyEmailPayload = {
  email: string;
  otp: string;
};
export type ResendOtpPayload = {
  email: string;
  action: string;
};

export type User = {
  readonly id: string;
  fullName: string;
  email: string;
  currency: string;
  avatarUrl: string | null;
  publicId: string | null;
  isActive: boolean;
};

export type Otp = {
  otp: string;
  expiresAt: string;
};
