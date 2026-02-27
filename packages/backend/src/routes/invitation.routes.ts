import {
  acceptInvitation,
  declineInvitation,
  getInvitations,
  sendingInvitation,
} from "@/controllers/invitation.controllers";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/:orgId/send-invitation", verifyJWT, sendingInvitation);
router.get("/:orgId/invitations", verifyJWT, getInvitations);
router.post("/accept", verifyJWT, acceptInvitation);
router.post("/decline/:invitationId", verifyJWT, declineInvitation);

export default router;
