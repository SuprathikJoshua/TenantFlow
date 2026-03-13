import { AcceptInvite } from "@/components/invite/accept-invite";
import { Suspense } from "react";

export default function InvitePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center" />
      }
    >
      <AcceptInvite />
    </Suspense>
  );
}
