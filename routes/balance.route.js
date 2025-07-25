import express from "express";
// Methods
import { getBalance } from "../controllers/balance.controller.js";

// Middleware
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Routes
router.get("/", authenticate, getBalance);

export default router;
