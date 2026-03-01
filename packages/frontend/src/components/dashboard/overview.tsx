import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Mail,
  Crown,
  ArrowUpRight,
  UserPlus,
  Shield,
  Activity,
} from "lucide-react";

const recentMembers = [
  {
    name: "Sarah Chen",
    email: "sarah@acmecorp.com",
    role: "Admin",
    initials: "SC",
  },
  {
    name: "Alex Rivera",
    email: "alex@acmecorp.com",
    role: "Member",
    initials: "AR",
  },
  {
    name: "Jordan Lee",
    email: "jordan@acmecorp.com",
    role: "Member",
    initials: "JL",
  },
  {
    name: "Morgan Kim",
    email: "morgan@acmecorp.com",
    role: "Viewer",
    initials: "MK",
  },
  {
    name: "Taylor Brooks",
    email: "taylor@acmecorp.com",
    role: "Member",
    initials: "TB",
  },
];

const recentActivity = [
  { action: "Sarah Chen joined the team", time: "2 hours ago", icon: UserPlus },
  { action: "Billing plan upgraded to Pro", time: "5 hours ago", icon: Crown },
  { action: "New role 'Editor' was created", time: "1 day ago", icon: Shield },
  { action: "3 pending invitations sent", time: "2 days ago", icon: Mail },
  {
    action: "API key rotated successfully",
    time: "3 days ago",
    icon: Activity,
  },
];

function getRoleBadgeVariant(role: string) {
  switch (role) {
    case "Admin":
      return "default";
    case "Member":
      return "secondary";
    case "Viewer":
      return "outline";
    default:
      return "secondary";
  }
}

export function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back, John
        </h1>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          {"Here's what's happening with your organization today."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Members"
          value="24"
          description="Across all teams"
          icon={Users}
          trend={{ value: "+3 this month", positive: true }}
        />
        <StatCard
          title="Pending Invitations"
          value="7"
          description="Awaiting acceptance"
          icon={Mail}
          trend={{ value: "5 sent this week", positive: true }}
        />
        <StatCard
          title="Current Plan"
          value="Free"
          description="5 of 10 seats used"
          icon={Crown}
        />
      </div>

      {/* Recent Members + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Members */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-base">Recent Members</CardTitle>
              <CardDescription>
                Latest people added to your organization
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {recentMembers.map((member) => (
                <div key={member.email} className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <p className="truncate text-sm font-medium text-foreground">
                      {member.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                  <Badge
                    variant={
                      getRoleBadgeVariant(member.role) as
                        | "default"
                        | "secondary"
                        | "outline"
                    }
                  >
                    {member.role}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href="/dashboard/team">
                View all members
                <ArrowUpRight className="size-3.5" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>
                Latest actions in your organization
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <item.icon
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-relaxed">
                      {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full text-muted-foreground hover:text-foreground"
            >
              View all activity
              <ArrowUpRight className="size-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
