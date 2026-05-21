import { api } from "@/lib/apiClient";
import type { RegisterForm, Users, SuccessResponse } from "../types/auth.types";

export const createUser = async (
  userData: RegisterForm,
): Promise<SuccessResponse<{ user: Users }>> => {
  const response = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  return response;
};
