export const authKeys = {
  all: ["auth"] as const,
  login: () => [...authKeys.all, "login"] as const,
  register: () => [...authKeys.all, "register"] as const,
  verify: () => [...authKeys.all, "verify"] as const,
  resend: () => [...authKeys.all, "resend"] as const,
  me: () => [...authKeys.all, "me"] as const,
};
