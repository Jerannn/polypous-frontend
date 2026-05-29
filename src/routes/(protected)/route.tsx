import {
  createFileRoute,
  Outlet,
  useLocation,
  useRouterState,
} from "@tanstack/react-router";

import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import ProtectedRoutePending from "@/components/routing/ProtectedRoutePending";
import RouteError from "@/components/routing/RouteError";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authGuard } from "@/features/auth/utils/authGuard";
import { APP_NAME, getNavItemByPathname } from "@/utils/constants";

export const Route = createFileRoute("/(protected)")({
  component: ProtectedLayout,
  loader: () => authGuard(),
  pendingComponent: ProtectedRoutePending,
  errorComponent: (props) => (
    <RouteError {...props} title="Unable to verify your session" showSignIn />
  ),
  head: () => ({
    meta: [{ title: APP_NAME }],
  }),
});

function ProtectedLayout() {
  const location = useLocation();
  const isNavigating = useRouterState({
    select: (state) => state.status === "pending",
  });
  const navItem = getNavItemByPathname(location.pathname);

  return (
    <div className="min-h-svh">
      {isNavigating && (
        <div
          className="absolute top-0 left-0 right-0 h-0.75 bg-primary animate-pulse z-9999"
          role="progressbar"
          aria-label="Loading page"
        />
      )}
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative">
          <header className="flex items-center gap-2 border-b border-border px-4 py-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="self-stretch" />
            {navItem && (
              <div>
                <h1 className="text-base font-medium">{navItem.title}</h1>
                <p className="text-muted-foreground text-xs">
                  {navItem.description}
                </p>
              </div>
            )}
          </header>
          <main className="p-4 flex-1">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
