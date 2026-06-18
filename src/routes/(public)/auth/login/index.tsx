import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import LoginForm from "@/features/auth/components/LoginForm";

export const Route = createFileRoute("/(public)/auth/login/")({
  validateSearch: z.object({
    redirect: z.string().optional().catch("/"),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  return <LoginForm />;
}
