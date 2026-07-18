import { z } from "zod";

import type {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyCodeSchema,
  verifyPasswordResetSchema,
} from "./schema";

export type RegisterPayload = z.infer<typeof registerSchema>;
export type VerifyCodePayload = z.infer<typeof verifyCodeSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
export type EmailPayload = z.infer<typeof emailSchema>;
export type VerifyPasswordResetPayload = z.infer<
  typeof verifyPasswordResetSchema
>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;

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
