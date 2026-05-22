import { createFileRoute, redirect } from "@tanstack/react-router";

import { requestOtp as requestOtpApi } from "@/features/auth/api";
import VerifyEmailCard from "@/features/auth/components/VerifyEmailCard";
import { verifySearchSchema } from "@/features/auth/schema";
import { queryClient } from "@/lib/queryClient";

export const otpQueryOptions = (email: string, action: string) => ({
  queryKey: ["otp", email, action],
  queryFn: () => requestOtpApi(email, action),
});

export const Route = createFileRoute("/(public)/auth/verify-email/")({
  component: VerifyPage,
  validateSearch: verifySearchSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps: { email } }) => {
    if (!email) {
      throw redirect({
        to: "/auth/register",
        replace: true,
      });
    }

    await queryClient.ensureQueryData(otpQueryOptions(email, "register"));
  },
});

function VerifyPage() {
  return <VerifyEmailCard />;
}
