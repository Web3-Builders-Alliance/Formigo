import express, { Request, Response } from "express";
import authenticateToken from "../middleware/auth";
import {
  createForm,
  getAllForms,
  getFormById,
  getFormByIdAnon,
  updateFormViews,
} from "../controllers/form.controller";
import rateLimit from "express-rate-limit";

const createAccountLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  limit: 1,
  message: async (req: Request, res: Response) => {
    return res.status(429).json({
      message:
        "Too many accounts created from this IP, please try again after a day",
      code: 429,
      status: false,
      data: null,
    });
  },
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const router = express.Router();

router.get("/", authenticateToken, getAllForms);
router.post("/", authenticateToken, createForm);
router.get("/:formId", authenticateToken, getFormById);
router.get("/anon/:formId", getFormByIdAnon);
router.patch("/views/:formId",createAccountLimiter, updateFormViews);

export default router;
