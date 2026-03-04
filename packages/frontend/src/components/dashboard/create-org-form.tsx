"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2, Loader2 } from "lucide-react";
import { organizationApi } from "@/lib/api/organization";
import { useRouter } from "next/navigation";
import { useOrgStore } from "@/store/org-store";

export function CreateOrgForm() {
  const [orgName, setOrgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setCurrentOrgId = useOrgStore((state) => state.setCurrentOrgId);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await organizationApi.create({ name: orgName });
      setCurrentOrgId(res.data.data.org.id);
      router.push("/dashboard");
    } catch (error: any) {
      setError(
        error?.response?.data?.message || "Failed to create organization",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="size-150 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Link>

        {/* Card */}
        <div className="rounded-xl border border-border bg-card p-8">
          {/* Icon + heading */}
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="size-7 text-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                Create Organization
              </h1>
              <p className="text-sm text-muted-foreground">
                {"Set up your team's workspace"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                id="org-name"
                name="orgName"
                type="text"
                placeholder="e.g. Acme Corp"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                autoFocus
                autoComplete="organization"
              />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {"You'll be set as the Owner of this organization"}
              </p>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={isLoading || orgName.trim().length === 0}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Organization"
              )}
            </Button>
          </form>
        </div>

        {/* Bottom hint */}
        <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
          You can invite team members and configure roles after creation.
        </p>
      </div>
    </div>
  );
}
