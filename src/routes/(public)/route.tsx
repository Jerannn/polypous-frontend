import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)")({
  component: PublicRoute,
});

function PublicRoute() {
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
    </div>
  );
}
