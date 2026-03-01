import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For small teams getting started with TenantFlow.",
    features: [
      "Up to 5 team members",
      "1 workspace",
      "Basic role management",
      "Community support",
      "7-day activity log",
    ],
    cta: "Start Building",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams that need more power and control.",
    features: [
      "Up to 50 team members",
      "Unlimited workspaces",
      "Advanced RBAC",
      "Priority support",
      "SSO integration",
      "90-day activity log",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For organizations that require maximum security and scale.",
    features: [
      "Unlimited team members",
      "Unlimited workspaces",
      "Custom roles & policies",
      "Dedicated support",
      "SAML SSO",
      "Unlimited activity log",
      "Custom SLA",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Pricing
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Plans that grow with your team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Start free and scale as you need. All plans include core features
            with no hidden fees.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border p-8 ${
                tier.highlighted
                  ? "border-primary/50 bg-primary/3"
                  : "border-border/50 bg-card"
              }`}
            >
              {tier.highlighted && (
                <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground">
                  Recommended
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <ul className="mb-8 flex flex-1 flex-col gap-3" role="list">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${
                        tier.highlighted
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
