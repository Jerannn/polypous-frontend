import { createFileRoute, Outlet } from "@tanstack/react-router";

import Header from "@/components/Header";

export const Route = createFileRoute("/(public)")({
  component: PublicRoute,
});

function PublicRoute() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <footer>
        <div className="text-center py-4 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Polypous. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
