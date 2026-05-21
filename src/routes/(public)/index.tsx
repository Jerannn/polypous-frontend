import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/")({
  component: LandingPage,
});

function LandingPage() {
  return <div>LANDING PAGE</div>;
}
