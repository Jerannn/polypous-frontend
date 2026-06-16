export const dashboardKeys = {
  all: ["dashboard"] as const,
  recent: () => [...dashboardKeys.all, "recent"] as const,
};
