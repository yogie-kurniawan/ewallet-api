import express from "express";
// Methods
import {
  transaction,
  getHistoryTransactions,
} from "../controllers/transaction.controller.js";

// Middleware
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Routes
router.post("/", authenticate, transaction);
router.get("/history", authenticate, getHistoryTransactions);

export default router;
