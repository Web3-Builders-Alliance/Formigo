import express from "express";
import { auth, authMagic, getMe } from "../controllers/user.controller";
import authenticateToken from "../middleware/auth";
const router = express.Router();

router.post("/", auth);
router.get("/me", authenticateToken, getMe);

export default router;
