import {
  loginUser,
  registerUser,
  verifyEmail,
} from "@/controllers/auth.controllers";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/logout");
router.get("/verify-email", verifyEmail);

export default router;
