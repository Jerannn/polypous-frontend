import { api } from "@/lib/apiClient";

import type { User } from "../auth/types";
import type { Profile } from "./types";

export const updateProfile = async (payload: Profile): Promise<User> => {
  const response = await api("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return response.data.user;
};
