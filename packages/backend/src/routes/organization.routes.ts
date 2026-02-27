import {
  createOrg,
  findOrgById,
  getAllOrgsByUser,
} from "@/controllers/organization.controllers";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/create-organization", verifyJWT, createOrg);
router.get("/get-organization/:id", verifyJWT, findOrgById);
router.get("/get-all-organizations", verifyJWT, getAllOrgsByUser);

export default router;
