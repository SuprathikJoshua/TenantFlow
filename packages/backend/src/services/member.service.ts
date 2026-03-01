import ApiError from "@/utils/ApiError";
import prisma from "@/lib/prisma";

/**
 * Get all members of an organization service
 * @param orgId
 * @returns
 */
export const getAllOrgMembersService = async (orgId: string) => {
  const members = await prisma.organizationMember.findMany({
    where: { organizationId: orgId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
    },
  });

  if (!members || members.length === 0) {
    throw new ApiError(404, "No members found for this organization");
  }

  return members;
};

/**
 * remove a member from an organization Service
 * @param param0
 * @returns
 */
export const removeMemberFromOrgService = async ({
  orgId,
  memberId,
  userId,
}: {
  orgId: string;
  memberId: string;
  userId: string;
}) => {
  if (memberId === userId) {
    throw new ApiError(
      400,
      "You cannot remove yourself from the organization!!",
    );
  }

  const admin = await prisma.organizationMember.findFirst({
    where: { organizationId: orgId, userId, role: "ADMIN" },
  });

  if (!admin) {
    throw new ApiError(
      403,
      "Only organization admins can remove members from the organization!!",
    );
  }

  const member = await prisma.organizationMember.findUnique({
    where: { id: memberId },
  });
  if (!member) {
    throw new ApiError(404, "Member not found!!");
  }

  if (member.organizationId !== orgId) {
    throw new ApiError(
      400,
      "The member does not belong to the specified organization!!",
    );
  }

  await prisma.organizationMember.delete({
    where: { id: memberId },
  });

  return true;
};

/**
 * Change member role service
 */
export const updateMemberRoleService = async ({
  orgId,
  userId,
  memberId,
  role,
}: {
  orgId: string;
  userId: string;
  memberId: string;
  role: string;
}) => {
  const owner = await prisma.organizationMember.findFirst({
    where: { organizationId: orgId, userId, role: "OWNER" },
  });

  if (!owner) {
    throw new ApiError(
      404,
      "Only organization owners can change member roles!!",
    );
  }
  if (userId == owner.userId) {
    throw new ApiError(400, "You can't change your role!!");
  }

  if (role !== "ADMIN" && role !== "MEMBER") {
    throw new ApiError(400, "Invalid role specified!!");
  }

  const member = await prisma.organizationMember.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    throw new ApiError(404, "Member not found!!");
  }

  if (member.organizationId !== orgId) {
    throw new ApiError(
      400,
      "The member does not belong to the specified organization!!",
    );
  }

  await prisma.organizationMember.update({
    where: { id: memberId },
    data: { role },
  });

  return true;
};
