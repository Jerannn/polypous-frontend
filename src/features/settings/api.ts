import { api } from "@/lib/axios";

import type { User } from "../auth/types";
import type {
  Business,
  BusinessInput,
  ProfileInput,
  VerifyPasswordInput,
} from "./types";

export const updateProfile = async (payload: ProfileInput): Promise<User> => {
  const response = await api.patch("/users/me", payload);

  return response.data.data.user;
};

export const updateMyBusiness = async (payload: BusinessInput) => {
  const response = await api.put("/users/me/business", payload);

  return response.data.data.business;
};

export const retrieveMyBusiness = async (): Promise<Business> => {
  const response = await api.get("/users/me/business");

  return response.data.data.business;
};

export const verifyPassword = async (
  payload: VerifyPasswordInput,
): Promise<boolean> => {
  const response = await api.post("/users/me/verify-password", payload);

  return response.data.data.verified;
};

export const deleteMe = async () => {
  await api.delete("/users/me");
};

export const updateBusinessLogo = async (payload: FormData) => {
  const response = await api.put("/users/me/business/logo", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data.business;
};
