import {
  getOrgMembers,
  removeMemberFromOrg,
  updateMemberRole,
} from "@/controllers/member.controllers";
import {
  createOrg,
  findOrgById,
  getAllOrgsByUser,
} from "@/controllers/organization.controllers";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

// Organizations routes
router.post("/create-organization", verifyJWT, createOrg);
router.get("/get-organization/:id", verifyJWT, findOrgById);
router.get("/get-all-organizations", verifyJWT, getAllOrgsByUser);

//Member management routes
router.get("/:orgId/members", verifyJWT, getOrgMembers);
router.delete("/:orgId/members/:memberId", verifyJWT, removeMemberFromOrg);
router.patch("/:orgId/members/:memberId", verifyJWT, updateMemberRole);

export default router;
