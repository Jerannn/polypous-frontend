import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import Footer from "./Footer";
import Header from "./Header";
import Navlinks from "./Navlinks";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>

      <SidebarContent>
        <Navlinks />
      </SidebarContent>

      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
