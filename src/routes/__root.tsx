import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => (
  <>
    <div className="bg-background">
      <Outlet />
      <Toaster position="top-center" />
    </div>
    {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
  </>
);

export const Route = createRootRoute({ component: RootLayout });
