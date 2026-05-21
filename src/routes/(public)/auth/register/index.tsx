import { createFileRoute } from "@tanstack/react-router";
import RegisterContainer from "../../../../features/auth/components/RegisterContainer";

export const Route = createFileRoute("/(public)/auth/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  return <RegisterContainer />;
}
