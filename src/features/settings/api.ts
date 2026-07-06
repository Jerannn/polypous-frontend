import { api } from "@/lib/axios";

import type { User } from "../auth/types";
import type { BusinessInput, ProfileInput, VerifyPasswordInput } from "./types";

export const updateProfile = async (payload: ProfileInput): Promise<User> => {
  const response = await api.patch("/users/me", payload);

  return response.data.data.user;
};

export const updateMyBusiness = async (payload: BusinessInput) => {
  const response = await api.put("/users/me/business", payload);

  return response.data.data.business;
};

export const retrieveMyBusiness = async () => {
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
