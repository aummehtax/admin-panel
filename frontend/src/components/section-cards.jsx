import { TrendingDown, TrendingUp, Users, Shield, UserCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ totalUsers = 0, adminCount = 0, moderatorCount = 0 }) {
  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalUsers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Users className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            All registered users <Users className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total user accounts in system
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Admin Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {adminCount}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Shield className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            System administrators <Shield className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Users with full access
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Moderator Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {moderatorCount}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <UserCheck className="size-4" />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Content moderators <UserCheck className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Users with moderation privileges
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
