import { createFileRoute, redirect } from "@tanstack/react-router";

import LoginForm from "@/features/auth/components/LoginForm";

export const Route = createFileRoute("/(public)/auth/login/")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
