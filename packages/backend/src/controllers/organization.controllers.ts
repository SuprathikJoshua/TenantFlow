import {
  createOrgService,
  findOrgByIdService,
  getAllOrgsByUserService,
} from "@/services/organization.service";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import { Request, Response } from "express";
/**
 * Create an organization
 */
export const createOrg = asyncHandler(async (req: Request, res: Response) => {
  const { name, subscriptionTier } = req.body;
  const userId = req.userId as string;

  if (!name) {
    throw new ApiError(409, "All fields are required");
  }

  const organization = await createOrgService({
    name,
    userId,
    subscriptionTier,
  });

  if (!organization) {
    throw new ApiError(
      502,
      "Error while creating Organization. Please try after sometime!",
    );
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, organization, "Organization created successfully!"),
    );
});

/**
 *Get organization by its ID
 */
export const findOrgById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const organization = await findOrgByIdService(id as string);

  res
    .status(200)
    .json(
      new ApiResponse(200, organization, "Organization fetched successfully!"),
    );
});

/**
 *Get all orgs user belongs
 */
export const getAllOrgsByUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const organizations = await getAllOrgsByUserService(userId);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          organizations,
          "Organizations fetched successfully!",
        ),
      );
  },
);
