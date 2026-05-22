import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z
      .email({ message: "Please enter a valid email address" })
      .transform((val) => val.toLowerCase().trim()),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .transform((val) => val.toLowerCase().trim()),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const verifySearchSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .transform((val) => val.toLowerCase().trim())
    .catch(""),
});

export const verifyCodeSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "Verification code must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "Verification code must contain only digits" }),
});
