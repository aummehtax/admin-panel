import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { DashboardIcon } from "./DashboardIcon"
import { UserRoundIcon } from "./UserRoundIcon"
import { Github } from "lucide-react"

export function SiteHeader() {
  const location = useLocation()

  // Define route configurations
  const routeConfig = {
    '/dashboard': {
      title: 'Dashboard',
      icon: DashboardIcon,
      description: 'Admin Panel Overview'
    },
    '/profile': {
      title: 'Profile',
      icon: UserRoundIcon,
      description: 'User Profile Management'
    }
  }

  // Get current route config, fallback to dashboard
  const currentRoute = routeConfig[location.pathname] || routeConfig['/dashboard']
  

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 border-border sticky top-0 z-40 flex h-12 shrink-0 items-center justify-between border-b px-3 backdrop-blur transition-all duration-200 group-has-data-[collapsible=icon]/sidebar-wrapper:h-10">
      <div className="flex w-full items-center gap-1 lg:gap-2 ">
        <SidebarTrigger className="" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        {/* Dynamic title and icon based on route */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <h1 className="text-base font-medium">{currentRoute.title}</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">{currentRoute.description}</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <Link
              to="https://github.com/aummehtax/admin-panel"
              className="dark:text-foreground"
              rel="noopener noreferrer"
              target="_blank"
              >
              <Github className="size-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
