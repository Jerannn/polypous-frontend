import { api } from "@/lib/apiClient";

import type { User } from "../auth/types";
import type { BusinessInput, ProfileInput, VerifyPasswordInput } from "./types";

export const updateProfile = async (payload: ProfileInput): Promise<User> => {
  const response = await api("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return response.data.user;
};

export const updateMyBusiness = async (payload: BusinessInput) => {
  const response = await api("/users/me/business", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return response.data.business;
};

export const retrieveMyBusiness = async () => {
  const response = await api("/users/me/business", {
    method: "GET",
  });

  return response.data.business;
};

export const verifyPassword = async (
  payload: VerifyPasswordInput,
): Promise<boolean> => {
  const response = await api("/users/me/verify-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data.verified;
};
