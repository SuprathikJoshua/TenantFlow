import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pt-20">
      {/* Subtle grid background */}
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
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "800px",
          height: "600px",
          background:
            "radial-gradient(ellipse, oklch(0.72 0.19 168 / 0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Badge
          variant="outline"
          className="mb-6 border-primary/30 bg-primary/5 text-primary"
        >
          Now in Public Beta
        </Badge>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Manage Your Teams,{" "}
          <span className="text-primary">Securely at Scale</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          The multi-tenant platform that gives every team their own secure
          workspace. Built for organizations that need enterprise-grade access
          control without the complexity.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/dashboard">
              Get Started Free
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            Watch Demo
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span
              className="size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <span
              className="size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            14-day free trial
          </span>
          <span className="flex items-center gap-2">
            <span
              className="size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}
