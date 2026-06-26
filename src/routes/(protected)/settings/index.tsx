import { createFileRoute } from "@tanstack/react-router";

import SettingContainer from "@/features/settings/components/SettingContainer";

export const Route = createFileRoute("/(protected)/settings/")({
  component: SettingsPage,
});

function SettingsPage() {
  return <SettingContainer />;
}
