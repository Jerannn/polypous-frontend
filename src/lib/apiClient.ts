import { ApiError } from "@/utils/apiError";
import env from "@/utils/env";

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
      const errorData = await res.json();
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
