import ApiError from "@/utils/ApiError";
import { Request, Response } from "express";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import {
  getAllOrgMembersService,
  removeMemberFromOrgService,
  updateMemberRoleService,
} from "@/services/member.service";

/**
 * Get all members of an organization
 * @route GET /api/organizations/:orgId/members
 */
export const getOrgMembers = asyncHandler(
  async (req: Request, res: Response) => {
    const { orgId } = req.params;

    if (!orgId) {
      throw new ApiError(400, "Organization ID is required!!");
    }

    const members = await getAllOrgMembersService(orgId as string);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          members,
          "Organization members fetched successfully!!",
        ),
      );
  },
);

/**
 * Remove a member from an organization
 */
export const removeMemberFromOrg = asyncHandler(
  async (req: Request, res: Response) => {
    const { orgId, memberId } = req.params;
    const userId = req.userId;
    const userDeleted = await removeMemberFromOrgService({
      orgId: orgId as string,
      memberId: memberId as string,
      userId: userId as string,
    });

    if (!userDeleted) {
      throw new ApiError(
        500,
        "Failed to delete the user from the organization!!",
      );
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully!"));
  },
);

/**
 * Update member role of a
 */
export const updateMemberRole = asyncHandler(
  async (req: Request, res: Response) => {
    const { orgId, memberId } = req.params;
    const userId = req.userId;
    const { role } = req.body;

    const userUpdated = await updateMemberRoleService({
      orgId: orgId as string,
      memberId: memberId as string,
      userId: userId as string,
      role: role as string,
    });

    if (!userUpdated) {
      throw new ApiError(
        500,
        "Failed to update the user role in the organization!!",
      );
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "User role changed successfully!"));
  },
);
