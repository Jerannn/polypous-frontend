import { useNavigate } from "@tanstack/react-router";
import { CircleUser, EllipsisVertical, LogOut, Moon, Sun } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/context/ThemeProvider";
import { useAuth } from "@/features/auth/AuthProvider";
import { cn } from "@/lib/utils";

export default function Footer() {
  const navigate = useNavigate();
  const { logout, isLoggingOut, user } = useAuth();
  const { isMobile } = useSidebar();
  const { theme, handleThemeChange } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-muted hover:text-secondary-foreground focus-visible:ring-0 cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user?.avatarUrl || ""} alt={user?.fullName} />
                <AvatarFallback className="rounded-full bg-primary text-primary-foreground uppercase">
                  {user?.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-medium capitalize">
                  {user?.fullName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.avatarUrl || ""}
                    alt={user?.fullName}
                  />
                  <AvatarFallback className="rounded-full bg-primary text-primary-foreground uppercase">
                    {user?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-medium capitalize">
                    {user?.fullName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
                <CircleUser />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {theme === "light" ? <Sun /> : <Moon />}
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    className={cn(theme === "light" && "bg-muted")}
                    onClick={() => handleThemeChange("light")}
                  >
                    Light
                    <DropdownMenuShortcut>
                      <Sun />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(theme === "dark" && "bg-muted")}
                    onClick={() => handleThemeChange("dark")}
                  >
                    Dark
                    <DropdownMenuShortcut>
                      <Moon />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              disabled={isLoggingOut}
              onSelect={async (event) => {
                event.preventDefault();
                await logout();
                navigate({ to: "/auth/login" });
              }}
            >
              <LogOut />
              {isLoggingOut ? "Signing out…" : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
