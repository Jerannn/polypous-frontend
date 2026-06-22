import { createFileRoute, redirect } from "@tanstack/react-router";

import RegisterForm from "@/features/auth/components/RegisterForm";
import { getMeFromCache } from "@/features/auth/queries";

export const Route = createFileRoute("/(public)/auth/register/")({
  beforeLoad: ({ context }) => {
    if (getMeFromCache(context.queryClient)) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  return <RegisterForm />;
}
