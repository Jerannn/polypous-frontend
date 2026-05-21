import env from "@/lib/env";

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
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
