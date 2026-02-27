import { SubscriptionTier } from "@/generated/prisma/enums";

export interface CreateOrganizationInput {
  name: string;
  userId: string;
  subscriptionTier?: SubscriptionTier;
}

export interface GetOrganizationInput {
  orgId: string;
  userId: string;
}
