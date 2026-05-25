import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

import { getMe } from "@/features/auth/api";
import useAuthStore from "@/features/auth/store";
import { ApiError } from "@/utils/apiError";

import { queryClient } from "../lib/queryClient";

export const meQueryOptions = queryOptions({
  queryKey: ["auth", "me"],
  queryFn: getMe,
  staleTime: 5 * 60 * 1000,
  retry: false,
});

export const requireAuth = async () => {
  try {
    const user = await queryClient.ensureQueryData(meQueryOptions);
    useAuthStore.getState().setUser(user);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 401) {
      console.log(error);
      throw redirect({
        to: "/auth/login",
        replace: true,
      });
    }

    throw error;
  }
};
