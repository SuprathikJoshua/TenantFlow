import { Building2, ShieldCheck, KeyRound, UserPlus } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Multi-Tenant Architecture",
    description:
      "Each organization gets a fully isolated workspace with dedicated data, settings, and user management. Scale from one team to thousands.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access Control",
    description:
      "Define granular permissions with custom roles. Control who can view, edit, or manage resources across your entire organization.",
  },
  {
    icon: KeyRound,
    title: "Secure JWT Authentication",
    description:
      "Industry-standard JWT tokens with automatic rotation, refresh flows, and session management. Security that just works.",
  },
  {
    icon: UserPlus,
    title: "Team Invitations",
    description:
      "Invite members via email with role pre-assignment. Bulk invitations, custom onboarding flows, and SSO integration included.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to manage teams at scale
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Built from the ground up for multi-tenant organizations. Every
            feature is designed with security and scalability in mind.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card p-8 transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <feature.icon className="size-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
