import type { Metadata } from "next";
import { AuthBranding } from "@/components/auth/auth-branding";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account - TenantFlow",
  description:
    "Create a TenantFlow account to start managing your teams securely.",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-svh">
      {/* Left - Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2">
        <AuthBranding />
      </div>

      {/* Right - Form Panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2 lg:hidden">
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
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
