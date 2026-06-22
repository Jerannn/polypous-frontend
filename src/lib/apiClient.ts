import { authKeys } from "@/features/auth/queryKeys";
import type { FailResponse } from "@/types/response.types";
import { ApiError } from "@/utils/apiError";
import env from "@/utils/env";

import { queryClient } from "./queryClient";

export async function api(path: string, options?: RequestInit) {
  try {
    const headers = new Headers(options?.headers);

    if (!(options?.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    const res = await fetch(`${env.API_URL}${path}`, {
      credentials: "include",
      ...options,
      headers,
    });

    if (!res.ok) {
      if (res.status === 401 && !path.endsWith("/users/me")) {
        queryClient.setQueryData(authKeys.me(), null);
      }

      const errorData = (await res.json()) as FailResponse;

      throw new ApiError(
        errorData.message || res.statusText,
        res.status,
        errorData,
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
