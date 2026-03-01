"use client";

import { useState } from "react";
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

interface Invitation {
  id: string;
  email: string;
  role: string;
  sentDate: string;
}

const initialInvitations: Invitation[] = [
  {
    id: "inv-1",
    email: "dev@newcompany.com",
    role: "Member",
    sentDate: "Feb 25, 2026",
  },
  {
    id: "inv-2",
    email: "designer@studio.io",
    role: "Member",
    sentDate: "Feb 26, 2026",
  },
  {
    id: "inv-3",
    email: "cto@startup.co",
    role: "Admin",
    sentDate: "Feb 28, 2026",
  },
];

function getRoleBadgeClass(role: string) {
  switch (role) {
    case "Admin":
      return "bg-chart-4/15 text-chart-4 border-chart-4/20";
    case "Member":
      return "bg-secondary text-secondary-foreground border-border";
    default:
      return "bg-secondary text-secondary-foreground border-border";
  }
}

export function PendingInvitations() {
  const [invitations, setInvitations] =
    useState<Invitation[]>(initialInvitations);

  function handleCancel(id: string) {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  }

  if (invitations.length === 0) {
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
          {invitations.map((invitation) => (
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
                  {invitation.sentDate}
                </div>
              </TableCell>
              <TableCell className="text-right pr-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-destructive"
                  onClick={() => handleCancel(invitation.id)}
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
