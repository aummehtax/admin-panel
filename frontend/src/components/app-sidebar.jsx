import * as React from "react";
import { Link } from "react-router-dom";
import { DashboardIcon } from "./DashboardIcon";
import { UserRoundIcon } from "./UserRoundIcon";
import { NavUser } from "@/components/nav-user";
import { useUser } from "@/contexts/UserContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Static navigation data
const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRoundIcon,
  },
];

export function AppSidebar({ ...props }) {
  const { user } = useUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/">
                <span className="text-base font-semibold">Admin Panel </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  variant="outline"
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon size={16} />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
