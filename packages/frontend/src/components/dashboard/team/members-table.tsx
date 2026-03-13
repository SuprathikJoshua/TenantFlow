"use client";

import { useMembers } from "@/hooks/use-team";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  ShieldCheck,
  UserCog,
  UserMinus,
  Crown,
} from "lucide-react";

function getRoleBadgeClass(role: string) {
  switch (role) {
    case "OWNER":
      return "bg-primary/15 text-primary border-primary/20";
    case "ADMIN":
      return "bg-chart-4/15 text-chart-4 border-chart-4/20";
    default:
      return "bg-secondary text-secondary-foreground border-border";
  }
}

function getRoleIcon(role: string) {
  switch (role) {
    case "OWNER":
      return <Crown className="size-3" />;
    case "ADMIN":
      return <ShieldCheck className="size-3" />;
    default:
      return null;
  }
}

export function MembersTable() {
  const { data: members, isLoading } = useMembers();

  if (isLoading) {
    return <p className="text-muted-foreground text-sm">Loading members...</p>;
  }

  if (!members || members.length === 0) {
    return <p className="text-muted-foreground text-sm">No members found.</p>;
  }

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground pl-4">Member</TableHead>
            <TableHead className="text-muted-foreground hidden sm:table-cell">
              Role
            </TableHead>
            <TableHead className="text-muted-foreground hidden md:table-cell">
              Joined
            </TableHead>
            <TableHead className="text-muted-foreground text-right pr-4">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member: any) => (
            <TableRow key={member.id} className="border-border">
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {member.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {member.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {member.user.email}
                    </span>
                    <div className="mt-1 sm:hidden">
                      <Badge
                        variant="outline"
                        className={getRoleBadgeClass(member.role)}
                      >
                        {getRoleIcon(member.role)}
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge
                  variant="outline"
                  className={getRoleBadgeClass(member.role)}
                >
                  {getRoleIcon(member.role)}
                  {member.role}
                </Badge>
              </TableCell>
              <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                {new Date(member.joinedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right pr-4">
                {member.role !== "OWNER" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Manage Member</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {member.role === "ADMIN" ? (
                        <DropdownMenuItem className="gap-3">
                          <UserCog className="size-4" />
                          Change to Member
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="gap-3">
                          <ShieldCheck className="size-4" />
                          Change to Admin
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-3 text-destructive focus:text-destructive">
                        <UserMinus className="size-4" />
                        Remove from team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <span className="text-xs text-muted-foreground px-2">--</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
