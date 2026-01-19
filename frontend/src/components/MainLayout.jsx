import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "./site-header"

const MainLayout = () => {


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4">
        <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
