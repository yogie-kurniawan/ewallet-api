import express from "express";
// Methods
import { getServices } from "../controllers/service.controller.js";

// Middleware
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Routes
router.get("/", authenticate, getServices);

export default router;
