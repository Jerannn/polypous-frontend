import { createFileRoute, redirect } from "@tanstack/react-router";

import LoginForm from "@/features/auth/components/LoginForm";
import { getMeFromCache } from "@/features/auth/queries";

export const Route = createFileRoute("/(public)/auth/login/")({
  beforeLoad: ({ context }) => {
    if (getMeFromCache(context.queryClient)) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
