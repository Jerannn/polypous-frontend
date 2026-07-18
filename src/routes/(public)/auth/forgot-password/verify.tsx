import { createFileRoute, redirect } from "@tanstack/react-router";

import VerifyPasswordResetForm from "@/features/auth/components/VerifyPasswordResetForm";
import { verifyEmailSchema } from "@/features/auth/schema";

export const Route = createFileRoute("/(public)/auth/forgot-password/verify")({
  component: VerifyForgotPasswordPage,
  validateSearch: verifyEmailSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps: { email } }) => {
    if (!email) {
      throw redirect({
        to: "/auth/register",
        replace: true,
      });
    }
  },
});

function VerifyForgotPasswordPage() {
  return <VerifyPasswordResetForm />;
}
