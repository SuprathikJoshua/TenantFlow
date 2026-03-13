import {
  acceptInvitation,
  declineInvitation,
  getInvitations,
  sendingInvitation,
} from "@/controllers/invitation.controllers";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

// Static Routes
router.patch("/accept", verifyJWT, acceptInvitation);
router.patch("/decline", verifyJWT, declineInvitation);

//Dynmic Routes
router.post("/:orgId/send-invitation", verifyJWT, sendingInvitation);
router.get("/:orgId/invitations", verifyJWT, getInvitations);

export default router;
