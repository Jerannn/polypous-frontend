import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/settings/")({
  component: SettingsPage,
});

function SettingsPage() {
  return <div>Settings Page</div>;
}
