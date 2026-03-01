"use client";

import { useState } from "react";
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

interface Member {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  initials: string;
  joinedDate: string;
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acmecorp.com",
    role: "Owner",
    initials: "JD",
    joinedDate: "Jan 15, 2025",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@acmecorp.com",
    role: "Admin",
    initials: "SC",
    joinedDate: "Feb 3, 2025",
  },
  {
    id: "3",
    name: "Alex Rivera",
    email: "alex@acmecorp.com",
    role: "Member",
    initials: "AR",
    joinedDate: "Mar 12, 2025",
  },
  {
    id: "4",
    name: "Jordan Lee",
    email: "jordan@acmecorp.com",
    role: "Member",
    initials: "JL",
    joinedDate: "Apr 22, 2025",
  },
  {
    id: "5",
    name: "Morgan Kim",
    email: "morgan@acmecorp.com",
    role: "Admin",
    initials: "MK",
    joinedDate: "May 8, 2025",
  },
  {
    id: "6",
    name: "Taylor Brooks",
    email: "taylor@acmecorp.com",
    role: "Member",
    initials: "TB",
    joinedDate: "Jun 1, 2025",
  },
  {
    id: "7",
    name: "Casey Nguyen",
    email: "casey@acmecorp.com",
    role: "Member",
    initials: "CN",
    joinedDate: "Jul 19, 2025",
  },
];

function getRoleBadgeClass(role: string) {
  switch (role) {
    case "Owner":
      return "bg-primary/15 text-primary border-primary/20";
    case "Admin":
      return "bg-chart-4/15 text-chart-4 border-chart-4/20";
    case "Member":
      return "bg-secondary text-secondary-foreground border-border";
    default:
      return "bg-secondary text-secondary-foreground border-border";
  }
}

function getRoleIcon(role: string) {
  switch (role) {
    case "Owner":
      return <Crown className="size-3" />;
    case "Admin":
      return <ShieldCheck className="size-3" />;
    default:
      return null;
  }
}

export function MembersTable() {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  function handleRemove(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function handleChangeRole(id: string, newRole: "Admin" | "Member") {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m)),
    );
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
          {members.map((member) => (
            <TableRow key={member.id} className="border-border">
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {member.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {member.email}
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
                {member.joinedDate}
              </TableCell>
              <TableCell className="text-right pr-4">
                {member.role !== "Owner" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-foreground"
                        aria-label={`Actions for ${member.name}`}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Manage Member</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {member.role === "Admin" ? (
                        <DropdownMenuItem
                          className="gap-3"
                          onClick={() => handleChangeRole(member.id, "Member")}
                        >
                          <UserCog className="size-4" />
                          Change to Member
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          className="gap-3"
                          onClick={() => handleChangeRole(member.id, "Admin")}
                        >
                          <ShieldCheck className="size-4" />
                          Change to Admin
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="gap-3 text-destructive focus:text-destructive"
                        onClick={() => handleRemove(member.id)}
                      >
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
