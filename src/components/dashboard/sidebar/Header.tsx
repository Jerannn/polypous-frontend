import { Link } from "@tanstack/react-router";

import logo from "@/assets/img/logo.svg";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function Header() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent active:bg-transparent"
        >
          <Link
            to="/dashboard"
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={logo}
                alt="Polypous Logo's"
                className="w-9 h-9"
                loading="lazy"
              />
              <h1 className="text-xl font-bold">Polypous</h1>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
