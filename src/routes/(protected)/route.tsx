import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";

import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import RouteError from "@/components/routing/RouteError";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { APP_NAME, getNavItemByPathname } from "@/utils/constants";

export const Route = createFileRoute("/(protected)")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProtectedLayout,
  errorComponent: (props) => (
    <RouteError {...props} title="Unable to verify your session" showSignIn />
  ),
  head: () => ({
    meta: [{ title: APP_NAME }],
  }),
});

function ProtectedLayout() {
  const location = useLocation();
  const navItem = getNavItemByPathname(location.pathname);

  return (
    <div className="min-h-svh">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative max-h-[calc(100vh-18px)] overflow-hidden">
          <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-4 py-3">
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
          <main className="p-4 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
