"use client";

import { MembersTable } from "@/components/dashboard/team/members-table";
import { PendingInvitations } from "@/components/dashboard/team/pending-invitations";
import { InviteDialog } from "@/components/dashboard/team/invite-dialog";
import { Separator } from "@/components/ui/separator";
import { Users, Mail } from "lucide-react";

export function TeamManagement() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Team
          </h1>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            Manage your organization members and pending invitations.
          </p>
        </div>
        <InviteDialog />
      </div>

      <Separator className="bg-border" />

      {/* Members section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-base font-semibold text-foreground">Members</h2>
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
            7
          </span>
        </div>
        <MembersTable />
      </section>

      {/* Pending invitations section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Mail className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-base font-semibold text-foreground">
            Pending Invitations
          </h2>
          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
            3
          </span>
        </div>
        <PendingInvitations />
      </section>
    </div>
  );
}
