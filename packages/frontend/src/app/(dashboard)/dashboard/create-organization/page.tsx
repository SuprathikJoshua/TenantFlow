import type { Metadata } from "next";
import { CreateOrgForm } from "@/components/dashboard/create-org-form";

export const metadata: Metadata = {
  title: "Create Organization - TenantFlow",
  description: "Set up a new workspace for your team on TenantFlow.",
};

export default function CreateOrgPage() {
  return <CreateOrgForm />;
}
