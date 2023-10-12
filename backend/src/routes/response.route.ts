import express, { Request, Response } from "express";
import { getAllResponse, getResponseById, responseForm } from "../controllers/respondent.controller";
import rateLimit from "express-rate-limit";
import authenticateToken from "../middleware/auth";
const router = express.Router();

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10,
  message: async (req: Request, res: Response) => {
    return res.status(429).json({
      message:
        "Too many accounts created from this IP, please try again after an hour",
      code: 429,
      status: false,
      data: null,
    });
  },
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
router.post("/", createAccountLimiter, responseForm);
router.get("/", authenticateToken, getAllResponse);
router.get("/:responseId", authenticateToken, getResponseById);

export default router;
