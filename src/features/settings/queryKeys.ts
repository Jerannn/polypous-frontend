export const settingsKeys = {
  all: ["settings"] as const,
  profile: () => [...settingsKeys.all, "profile"] as const,
  business: () => [...settingsKeys.all, "business"] as const,
};
