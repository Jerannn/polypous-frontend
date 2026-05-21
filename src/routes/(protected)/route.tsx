import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)")({
  component: ProtectedLayout,
  beforeLoad: async () => {
    const isAuthenticated = true; // Replace with actual authentication logic from backend
    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        replace: true,
      });
    }
  },
});

function ProtectedLayout() {
  return (
    <main>
      <aside>Sidebar</aside>
      <Outlet />
    </main>
  );
}
