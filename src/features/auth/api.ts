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

export const register = async (
  userData: RegisterPayload,
): Promise<SuccessResponse<{ user: User }> | FailResponse> => {
  const response = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  return response;
};

export const login = async (
  payload: LoginPayload,
): Promise<SuccessResponse<{ user: User }> | FailResponse> => {
  const response = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response;
};

export const verifyEmailOtp = async (
  payload: VerifyEmailPayload,
): Promise<SuccessResponse<{ users: User }> | FailResponse> => {
  const response = await api("/auth/email/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response;
};

export const requestOtp = async (
  email: string,
  action: string,
): Promise<SuccessResponse<{ otp: Otp }> | FailResponse> => {
  const params = new URLSearchParams({ email, action });

  const response = await api(`/auth/email/otp?${params.toString()}`, {
    method: "GET",
  });

  return response;
};

export const resendOtp = async (
  payload: ResendOtpPayload,
): Promise<SuccessResponse<{ otp: Otp }> | FailResponse> => {
  const response = await api("/auth/email/resend", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response;
};
