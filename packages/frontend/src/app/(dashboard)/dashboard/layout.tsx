import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export const metadata: Metadata = {
  title: "Dashboard - TenantFlow",
  description:
    "Manage your organization, team members, and billing from the TenantFlow dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header with mobile sidebar trigger */}
        <div className="flex h-16 shrink-0 items-center border-b border-border bg-background">
          <div className="px-4 md:hidden">
            <MobileSidebar />
          </div>
          <div className="flex-1">
            <DashboardHeader />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
