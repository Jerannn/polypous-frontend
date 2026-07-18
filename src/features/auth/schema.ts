import { z } from "zod";

const baseEmail = z
  .email({ message: "Please enter a valid email address" })
  .transform((val) => val.toLowerCase().trim());

const baseOtp = z
  .string()
  .length(6, { message: "Verification code must be exactly 6 digits" })
  .regex(/^\d+$/, { message: "Verification code must contain only digits" });

const basePassword = z
  .string()
  .min(6, "Password must be at least 6 characters long");

export const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: baseEmail,
    password: basePassword,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: baseEmail,
  password: basePassword,
});

export const verifyEmailSchema = z.object({
  email: baseEmail.catch(""),
});

export const emailSchema = z.object({
  email: baseEmail,
});

export const verifyCodeSchema = z.object({
  otp: baseOtp,
});

export const verifyPasswordResetSchema = z.object({
  email: baseEmail,
  otp: baseOtp,
});

export const tokenSchema = z.object({
  token: z.string().min(1, "Token is required").catch(""),
});

export const resetPasswordSchema = z
  .object({
    newPassword: basePassword,
    confirmNewPassword: basePassword,
    token: z.string().min(1, "Token is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
