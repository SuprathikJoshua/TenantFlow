import {
  acceptInvitationService,
  cancelInvitationService,
  sendingInvitationService,
} from "@/services/invitation.service";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { Request, Response } from "express";

/**
 * Create Invitation record and send email
 */
export const sendingInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, role } = req.body;
    const { orgId } = req.params;
    const userId = req.userId as string;

    const invitation = await sendingInvitationService(
      email,
      role,
      orgId as string,
      userId,
    );
    if (!invitation) {
      throw new ApiError(500, "Failed to send invitation.");
    }
    res
      .status(200)
      .json(new ApiResponse(200, invitation, "Invitation sent successfully."));
  },
);

/**
 * Accept Invitation and add user to organization
 */
export const acceptInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.query;
    const userId = req.userId as string;
    await acceptInvitationService(token as string, userId);
    res.status(200).json(new ApiResponse(200, null, "Invitation accepted."));
  },
);

/**
 * Decline Invitation
 */
export const declineInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const { invitationId } = req.params;
    const userId = req.userId as string;
    await cancelInvitationService(invitationId as string, userId);
    res.status(200).json(new ApiResponse(200, null, "Invitation declined."));
  },
);
