import { Link, useLocation } from "@tanstack/react-router";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { navMainList } from "@/utils/constants";

export default function Navlinks() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {navMainList.map((item) => {
            const isActive = item.url === currentPath;

            return (
              <SidebarMenuItem
                className="flex items-center gap-2"
                key={item.url}
              >
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "min-w-8 duration-200 ease-linear hover:bg-muted hover:text-secondary-foreground",
                    isActive &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                  )}
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
