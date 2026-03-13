"use client";

import { useInvitations, useCancelInvitation } from "@/hooks/use-team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, X, Clock } from "lucide-react";

function getRoleBadgeClass(role: string) {
  switch (role) {
    case "ADMIN":
      return "bg-chart-4/15 text-chart-4 border-chart-4/20";
    default:
      return "bg-secondary text-secondary-foreground border-border";
  }
}

export function PendingInvitations() {
  const { data: invitations, isLoading } = useInvitations();
  const { mutate: cancelInvitation } = useCancelInvitation();

  if (isLoading) {
    return (
      <p className="text-muted-foreground text-sm">Loading invitations...</p>
    );
  }

  if (!invitations || invitations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
        <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
          <Mail className="size-5 text-muted-foreground" />
        </div>
        <p className="mt-4 text-sm font-medium text-foreground">
          No pending invitations
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Invite someone to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground pl-4">Email</TableHead>
            <TableHead className="text-muted-foreground hidden sm:table-cell">
              Role
            </TableHead>
            <TableHead className="text-muted-foreground hidden md:table-cell">
              Sent
            </TableHead>
            <TableHead className="text-muted-foreground text-right pr-4">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation: any) => (
            <TableRow key={invitation.id} className="border-border">
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Mail className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {invitation.email}
                    </span>
                    <div className="mt-1 flex items-center gap-1 sm:hidden">
                      <Badge
                        variant="outline"
                        className={getRoleBadgeClass(invitation.role)}
                      >
                        {invitation.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge
                  variant="outline"
                  className={getRoleBadgeClass(invitation.role)}
                >
                  {invitation.role}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  {new Date(invitation.createdAt).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="text-right pr-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-destructive"
                  onClick={() => cancelInvitation(invitation.id)}
                >
                  <X className="size-3.5" />
                  <span className="hidden sm:inline">Cancel</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
