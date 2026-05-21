import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/clients/")({
  component: ClientPage,
});

function ClientPage() {
  return <div>CLIENT PAGE</div>;
}
