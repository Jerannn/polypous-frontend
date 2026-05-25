import { api } from "@/lib/apiClient";
import type { FailResponse, SuccessResponse } from "@/types/response.types";

import type {
  LoginPayload,
  Otp,
  RegisterPayload,
  ResendOtpPayload,
  User,
  VerifyEmailPayload,
} from "./types";

export const register = async (userData: RegisterPayload): Promise<User> => {
  const response = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  return response.data.user;
};

export const login = async (payload: LoginPayload): Promise<User> => {
  const response = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data.user;
};

export const verifyEmailOtp = async (
  payload: VerifyEmailPayload,
): Promise<User> => {
  const response = await api("/auth/email/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data.user;
};

export const requestOtp = async (
  email: string,
  action: string,
): Promise<SuccessResponse<{ otp: Otp }> | FailResponse> => {
  const params = new URLSearchParams({ email, action });

  return await api(`/auth/email/otp?${params.toString()}`, {
    method: "GET",
  });
};

export const resendOtp = async (payload: ResendOtpPayload): Promise<Otp> => {
  const response = await api("/auth/email/resend", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data.otp;
};

export const getMe = async (): Promise<User> => {
  const response = await api("/users/me", {
    method: "GET",
  });

  if (response.status === "fail") {
    throw new Error(response.message);
  }

  return response.data.user;
};
