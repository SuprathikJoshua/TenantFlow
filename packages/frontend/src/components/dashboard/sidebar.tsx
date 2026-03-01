"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  ChevronDown,
  Building2,
  PanelLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const orgs = [
  { id: "1", name: "Acme Corp", initial: "A" },
  { id: "2", name: "Globex Inc", initial: "G" },
  { id: "3", name: "Initech", initial: "I" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [currentOrg, setCurrentOrg] = useState(orgs[0]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden flex-col border-r border-sidebar-border bg-sidebar md:flex",
        "transition-[width] duration-200 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo + collapse */}
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 3h5v5H3V3Zm7 0h5v5h-5V3ZM3 10h5v5H3v-5Zm7 2.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"
                fill="currentColor"
                className="text-primary-foreground"
              />
            </svg>
          </div>
          {!collapsed && (
            <span className="text-base font-semibold text-sidebar-foreground">
              TenantFlow
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft className="size-4" />
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Org Switcher */}
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-sidebar-accent",
                collapsed && "justify-center",
              )}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/15 text-sm font-semibold text-primary">
                {currentOrg.initial}
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 truncate">
                    <p className="truncate text-sm font-medium text-sidebar-foreground">
                      {currentOrg.name}
                    </p>
                    <p className="text-xs text-muted-foreground">Free plan</p>
                  </div>
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {orgs.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => setCurrentOrg(org)}
                className="gap-3"
              >
                <div className="flex size-6 items-center justify-center rounded bg-primary/15 text-xs font-semibold text-primary">
                  {org.initial}
                </div>
                {org.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-3">
              <Building2 className="size-4" />
              Create Organization
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <nav className="flex-1 p-3" aria-label="Dashboard navigation">
        <ul className="flex flex-col gap-1" role="list">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="size-4 shrink-0" aria-hidden="true" />
                  {!collapsed && item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom upgrade nudge */}
      {!collapsed && (
        <div className="p-3">
          <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/50 p-4">
            <p className="text-sm font-medium text-sidebar-foreground">
              Upgrade to Pro
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Unlock unlimited team members and advanced roles.
            </p>
            <Button size="sm" className="mt-3 w-full">
              Upgrade
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
