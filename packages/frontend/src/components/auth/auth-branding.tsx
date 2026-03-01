import Link from "next/link";
import { Shield, Users, Lock, Zap } from "lucide-react";

export function AuthBranding() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-secondary/50 p-10 lg:p-12">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute -left-1/4 top-0"
        style={{
          width: "600px",
          height: "500px",
          background:
            "radial-gradient(ellipse, oklch(0.72 0.19 168 / 0.06), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Logo */}
      <div className="relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
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
          <span className="text-lg font-semibold text-foreground">
            TenantFlow
          </span>
        </Link>
      </div>

      {/* Tagline & Features */}
      <div className="relative z-10 flex flex-col gap-8">
        <div>
          <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight text-foreground lg:text-3xl">
            Manage Your Teams,{" "}
            <span className="text-primary">Securely at Scale</span>
          </h2>
          <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            The multi-tenant platform that gives every team their own secure
            workspace with enterprise-grade access control.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Shield, label: "Multi-Tenant" },
            { icon: Users, label: "Role-Based Access" },
            { icon: Lock, label: "JWT Auth" },
            { icon: Zap, label: "Team Invites" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Icon className="size-3.5 text-primary" />
              </div>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-xs text-muted-foreground">
        Trusted by 2,000+ teams worldwide
      </p>
    </div>
  );
}
