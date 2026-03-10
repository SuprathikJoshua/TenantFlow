"use client";

import { useOrgStore } from "@/store/org-store";
import { useOrganizations, useOrgMembers } from "@/hooks/use-organization";
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
import { Users, Mail, Crown, ArrowUpRight, Building2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function DashboardOverview() {
  const { currentOrgId, setCurrentOrgId } = useOrgStore();
  const { data: orgs, isLoading: orgsLoading } = useOrganizations();
  const { data: members, isLoading: membersLoading } = useOrgMembers(
    currentOrgId || "",
  );
  useEffect(() => {
    if (orgs && orgs.length > 0 && !currentOrgId) {
      setCurrentOrgId(orgs[0].id);
    }
  }, [orgs, currentOrgId]);
  if (orgsLoading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  if (!orgs || orgs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Building2 className="size-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          No organizations yet
        </h1>
        <p className="max-w-sm text-muted-foreground">
          You don't belong to any organization yet. Create one to get started.
        </p>
        <Button asChild>
          <Link href="/dashboard/create-organization">Create Organization</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Here's what's happening with your organization today."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Members"
          value={membersLoading ? "..." : String(members?.length || 0)}
          description="Across all teams"
          icon={Users}
        />
        <StatCard
          title="Organizations"
          value={String(orgs.length)}
          description="You belong to"
          icon={Crown}
        />
        <StatCard
          title="Current Plan"
          value="Free"
          description="Upgrade for more features"
          icon={Mail}
        />
      </div>

      {members && members.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Members</CardTitle>
            <CardDescription>
              Latest people in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {members.slice(0, 5).map((member: any) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {member.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate">
                    <p className="truncate text-sm font-medium text-foreground">
                      {member.user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {member.user.email}
                    </p>
                  </div>
                  <Badge>{member.role}</Badge>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full text-muted-foreground"
              asChild
            >
              <Link href="/dashboard/team">
                View all members
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
