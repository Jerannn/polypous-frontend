import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/")({
  component: LandingPage,
});

function LandingPage() {
  return <div className="flex-1">LANDING PAGE</div>;
}
