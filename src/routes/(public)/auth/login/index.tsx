import LoginContainer from "@/features/auth/components/LoginContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/auth/login/")({
  component: LoginPage,
});

function LoginPage() {
  return <LoginContainer />;
}
