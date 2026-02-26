import { loginUser, registerUser } from "@/controllers/auth.controllers";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/logout");

export default router;
