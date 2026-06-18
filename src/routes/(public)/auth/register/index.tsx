import { createFileRoute, redirect } from "@tanstack/react-router";

import RegisterForm from "@/features/auth/components/RegisterForm";

export const Route = createFileRoute("/(public)/auth/register/")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  return <RegisterForm />;
}
