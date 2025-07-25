import express from "express";
// Methods
import { transaction } from "../controllers/transaction.controller.js";

// Middleware
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Routes
router.post("/", authenticate, transaction);

export default router;
