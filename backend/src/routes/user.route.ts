import express from "express";
import { auth } from "../controllers/user.controller";
const router = express.Router();

router.post("/", auth);


export default router;
