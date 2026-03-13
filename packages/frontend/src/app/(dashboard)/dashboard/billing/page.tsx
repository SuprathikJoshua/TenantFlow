export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Billing
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscription and payment details.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24 text-center">
        <p className="text-sm font-medium text-foreground">Coming soon</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Stripe billing will be available shortly.
        </p>
      </div>
    </div>
  );
}
