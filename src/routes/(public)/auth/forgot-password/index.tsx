import { createFileRoute } from "@tanstack/react-router";

import RequestPasswordResetForm from "@/features/auth/components/RequestPasswordResetForm";

export const Route = createFileRoute("/(public)/auth/forgot-password/")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return <RequestPasswordResetForm />;
}
