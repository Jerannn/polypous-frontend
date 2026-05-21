import { createFileRoute } from "@tanstack/react-router";
import { verifySearchSchema } from "@/features/auth/schema/auth.schema";

export const Route = createFileRoute("/(public)/auth/verify-email/")({
  component: VerifyPage,
  validateSearch: verifySearchSchema,
});

function VerifyPage() {
  const query = Route.useSearch();
  console.log("Verification query:", query);
  return <div>Verifying email: {query.email}</div>;
}
