"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Building2 } from "lucide-react";

export function AcceptInvite() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "declined" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    apiClient
      .get("/auth/me")
      .then(() => setChecking(false))
      .catch(() => {
        router.push(`/login?redirect=/invite?token=${token}`);
      });
  }, [token, router]);
  async function handleAccept() {
    setStatus("loading");
    try {
      await apiClient.patch(`/invitations/accept?token=${token}`);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message || "Invalid or expired invitation.",
      );
    }
  }

  async function handleDecline() {
    setStatus("loading");
    try {
      await apiClient.patch(`/invitations/decline?token=${token}`);
      setStatus("declined");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.response?.data?.message || "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle className="size-10 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Welcome aboard!</h1>
          <p className="text-muted-foreground">
            You have successfully joined the organization.
          </p>
          <Button onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (status === "declined") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <XCircle className="size-10 text-destructive" />
          <h1 className="text-xl font-bold text-foreground">
            Invitation Declined
          </h1>
          <p className="text-muted-foreground">
            You have declined the invitation.
          </p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <XCircle className="size-10 text-destructive" />
          <h1 className="text-xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">{message}</p>
          <Button variant="outline" onClick={() => router.push("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="size-7 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              You've been invited!
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              You have been invited to join an organization on TenantFlow.
            </p>
          </div>
          <div className="mt-4 flex w-full flex-col gap-3">
            <Button
              className="w-full"
              onClick={handleAccept}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Accept Invitation"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleDecline}
              disabled={status === "loading"}
            >
              Decline Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
