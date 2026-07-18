import { createFileRoute, redirect } from "@tanstack/react-router";

import VerifyEmailCard from "@/features/auth/components/VerifyEmailCard";
import { otpQueryOptions } from "@/features/auth/queries";
import { verifyEmailSchema } from "@/features/auth/schema";

export const Route = createFileRoute("/(public)/auth/verify-email")({
  component: VerifyPage,
  validateSearch: verifyEmailSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps: { email } }) => {
    if (!email) {
      throw redirect({
        to: "/auth/register",
        replace: true,
      });
    }

    await context.queryClient.ensureQueryData(
      otpQueryOptions(email, "register"),
    );
  },
});

function VerifyPage() {
  return <VerifyEmailCard />;
}
