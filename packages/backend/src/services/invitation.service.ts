import prisma from "@/lib/prisma";
import ApiError from "@/utils/ApiError";
import crypto from "crypto";
import { sendInvitationEmail } from "./email.service";
import { Role } from "@/generated/prisma/enums";
import { log } from "console";

/**
 * Get all invitations for an organization Service
 * @param orgId
 */
export const getAllInvitationsService = async (orgId: string) => {
  const invitations = await prisma.invitation.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: "desc" },
  });
  // console.log(invitations);

  return invitations;
};

/**
 * Create Invitation record and send email Service
 */
export const sendingInvitationService = async (
  email: string,
  role: string,
  orgId: string,
  userId: string,
) => {
  const existingInvitation = await prisma.invitation.findUnique({
    where: {
      email,
      id: orgId,
      status: "PENDING",
    },
  });

  if (existingInvitation) {
    throw new ApiError(
      400,
      "An invitation has already been sent to this email.",
    );
  }
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
  });

  if (!org) {
    throw new ApiError(404, "Organization not found.");
  }
  const token = crypto.randomBytes(32).toString("hex");
  const invitation = await prisma.invitation.create({
    data: {
      email,
      role: role as Role,
      organizationId: orgId,
      status: "PENDING",
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      invitedById: userId,
    },
  });

  if (!invitation) {
    throw new ApiError(
      500,
      "Failed to create invitation. Please try again later.",
    );
  }

  await sendInvitationEmail(email, token, org.name);
  return invitation;
};
/**
 *Accept invitation and add user to organization Service
 */
export const acceptInvitationService = async (
  token: string,
  userId: string,
) => {
  const invitation = await prisma.invitation.findFirst({
    where: { token },
  });

  if (!invitation) {
    throw new ApiError(404, "Invitation not found.");
  }
  if (invitation.status !== "PENDING") {
    throw new ApiError(400, "Invitation is no longer valid.");
  }
  if (invitation.expiresAt < new Date()) {
    throw new ApiError(400, "Invitation has expired.");
  }
  const existingMember = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId: invitation.organizationId,
        userId,
      },
    },
  });
  // console.log(existingMember);
  if (existingMember) {
    throw new ApiError(400, "You are already a member of this organization");
  }
  await prisma.$transaction(async (tx) => {
    await tx.organizationMember.create({
      data: {
        userId,
        organizationId: invitation.organizationId,
        role: invitation.role,
      },
    });
    await tx.invitation.update({
      where: { id: invitation.id },
      data: { status: "ACCEPTED" },
    });
  });
  return true;
};
/**
 * Cancel pending invitation Service
 */
export const cancelInvitationService = async (
  invitationId: string,
  userId: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
  });

  if (!invitation) {
    throw new ApiError(404, "Invitation not found.");
  }
  if (invitation.status !== "PENDING") {
    throw new ApiError(400, "Only pending invitations can be cancelled.");
  }
  if (invitation.email !== user?.email) {
    throw new ApiError(
      403,
      "You are not authorized to cancel this invitation.",
    );
  }
  await prisma.invitation.update({
    where: { id: invitationId },
    data: { status: "DECLINED" },
  });
  return true;
};
