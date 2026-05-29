import { queryClient } from "@/lib/queryClient";

import { meQueryOptions } from "../queries";
import useAuthStore from "../store";
import type { User } from "../types";

export function syncAuthUser(user: User) {
  useAuthStore.getState().setUser(user);
  queryClient.setQueryData(meQueryOptions.queryKey, user);
}

export function clearAuthSession() {
  useAuthStore.getState().setUser(null);
  queryClient.removeQueries({ queryKey: ["auth"] });
}
