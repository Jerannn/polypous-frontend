import { redirect } from "@tanstack/react-router";

import { ApiError } from "@/utils/apiError";

import { queryClient } from "../../../lib/queryClient";
import { meQueryOptions } from "../queries";
import { clearAuthSession, syncAuthUser } from "./authSession";

export const authGuard = async () => {
  try {
    const user = await queryClient.fetchQuery(meQueryOptions);

    syncAuthUser(user);
  } catch (error: unknown) {
    if (error instanceof ApiError && error.statusCode === 401) {
      clearAuthSession();
      throw redirect({
        to: "/auth/login",
        replace: true,
      });
    }

    throw error;
  }
};
