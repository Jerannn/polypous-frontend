import { api } from "@/lib/axios";
import type { SuccessResponse } from "@/types/response.types";

import type {
  LoginPayload,
  Otp,
  RegisterPayload,
  ResendOtpPayload,
  User,
  VerifyEmailPayload,
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
  console.log(response);
  return response.data.data.user;
};

export const logout = async (): Promise<string> => {
  const response = (await api.post("/auth/logout")) as SuccessResponse<null>;

  return response.status;
};
