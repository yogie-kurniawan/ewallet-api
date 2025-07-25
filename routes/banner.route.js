import express from "express";
// Methods
import { getBanners } from "../controllers/banner.controller.js";

const router = express.Router();

// Routes
router.get("/", getBanners);

export default router;
