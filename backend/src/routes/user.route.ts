import express from "express";
import { getEc } from "../controllers/user.controller";
const router = express.Router();

router.get("/ec/:wallet", getEc);

export default router;
