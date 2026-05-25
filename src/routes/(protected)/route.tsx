import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { requireAuth } from "@/utils/auth";
import { navMainList } from "@/utils/constants";

export const Route = createFileRoute("/(protected)")({
  component: ProtectedLayout,
  beforeLoad: () => requireAuth(),
  pendingComponent: () => <div>Loading...</div>,
});

function ProtectedLayout() {
  const location = useLocation();
  const currentPathName = location.pathname.replace("/", "") || "dashboard";

  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center gap-2 border-b border-border px-4 py-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="self-stretch" />
            {navMainList.map((item) => {
              if (!item.url.includes(currentPathName)) return null;
              return (
                <div key={item.url}>
                  <h1 className="text-base font-medium capitalize">
                    {item.title}
                  </h1>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </header>
          <main className="p-4 flex-1">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
