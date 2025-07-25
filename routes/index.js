import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import bannerRoutes from "./banner.route.js";
import serviceRoutes from "./service.route.js";
import balanceRoutes from "./balance.route.js";
import topUpRoutes from "./topup.route.js";
import transactionRoutes from "./transaction.route.js";

const router = express.Router();

// Root Route
router.use("/", (req, res) => {
  res.status(200).json({
    status: 0,
    message: "Sukses!",
  });
});
// Auth Routes
router.use("/", authRoutes);
// User Routes
router.use("/", userRoutes);
// Banner Routes
router.use("/", bannerRoutes);
// Service Routes
router.use("/", serviceRoutes);
// Balance Routes
router.use("/", balanceRoutes);
// Top Up Routes
router.use("/", topUpRoutes);
// Transaction Routes
router.use("/", transactionRoutes);

export default router;
