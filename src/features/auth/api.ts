import { api } from "@/lib/axios";
import type { SuccessResponse } from "@/types/response.types";

import type {
  EmailPayload,
  LoginPayload,
  Otp,
  RegisterPayload,
  ResendOtpPayload,
  ResetPasswordPayload,
  User,
  VerifyEmailPayload,
  VerifyPasswordResetPayload,
} from "./types";

export const register = async (payload: RegisterPayload): Promise<User> => {
  const response = await api.post("/auth/register", payload);

  return response.data.user;
};

export const login = async (
  payload: LoginPayload,
): Promise<
  SuccessResponse<{
    user: User;
  }>
> => {
  const response = await api.post("/auth/login", payload);

  return response.data;
};

export const verifyEmailOtp = async (
  payload: VerifyEmailPayload,
): Promise<User> => {
  const response = await api.post("/auth/email/verify", payload);

  return response.data.data.user;
};

export const requestOtp = async (
  email: string,
  action: string,
): Promise<Otp> => {
  const params = new URLSearchParams({ email, action });
  const response = await api.get("/auth/email/otp", { params });

  return response.data.data.otp;
};

export const resendOtp = async (payload: ResendOtpPayload): Promise<Otp> => {
  const response = await api.post("/auth/email/resend", payload);

  return response.data.data.otp;
};

export const getMe = async (): Promise<User | null> => {
  const response = await api.get("/users/me");

  return response.data.data.user;
};

export const logout = async (): Promise<string> => {
  const response = (await api.post("/auth/logout")) as SuccessResponse<null>;

  return response.status;
};

export const requestPasswordReset = async (payload: EmailPayload) => {
  await api.post("/auth/password/forgot", payload);
};

export const verifyPasswordReset = async (
  payload: VerifyPasswordResetPayload,
): Promise<string> => {
  const response = await api.post("/auth/password/verify", payload);

  return response.data.data.token;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  await api.post("/auth/password/reset", payload);
};
