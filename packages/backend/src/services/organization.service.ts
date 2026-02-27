import prisma from "@/lib/prisma";
import { CreateOrganizationInput } from "@/types/organization.types";
import ApiError from "@/utils/ApiError";
import crypto from "crypto";
import { preprocess } from "zod";
/**
 * Create organization service
 */
export const createOrgService = async ({
  name,
  userId,
  subscriptionTier,
}: CreateOrganizationInput) => {
  const baseSlug = name.toLowerCase().trim().replace(/\s+/g, "-");
  const slug = `${baseSlug}-${crypto.randomBytes(4).toString("hex")}`;

  const result = await prisma.$transaction(async (tx) => {
    const org = await tx.organization.create({
      data: { name, ownerId: userId, subscriptionTier, slug },
    });
    await tx.organizationMember.create({
      data: { organizationId: org.id, userId, role: "OWNER" },
    });
    return org;
  });

  return { org: result };
};

/**
 * Find organization by its ID
 */
export const findOrgByIdService = async (id: string) => {
  const org = await prisma.organization.findUnique({ where: { id } });

  if (!org) {
    throw new ApiError(404, "Organization not found");
  }
  return { org };
};

/**
 * Get all organizations user belongs
 */
export const getAllOrgsByUserService = async (userId: string) => {
  const orgs = await prisma.organization.findMany({
    where: {
      OR: [{ ownerId: userId }, { members: { some: { userId } } }],
    },
  });

  return { orgs };
};
