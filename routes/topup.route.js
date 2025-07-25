import express from "express";
// Methods
import { topUp } from "../controllers/topup.controller.js";

// Middleware
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Routes
router.post("/", authenticate, topUp);

export default router;
