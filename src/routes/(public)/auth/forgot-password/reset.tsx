import { createFileRoute, redirect } from "@tanstack/react-router";

import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { tokenSchema } from "@/features/auth/schema";

export const Route = createFileRoute("/(public)/auth/forgot-password/reset")({
  component: ResetForgotPasswordPage,
  validateSearch: tokenSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps: { token } }) => {
    if (!token) {
      throw redirect({
        to: "/auth/register",
        replace: true,
      });
    }
  },
});

function ResetForgotPasswordPage() {
  return <ResetPasswordForm />;
}
