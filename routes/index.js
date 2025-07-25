import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import bannerRoutes from "./banner.route.js";
import serviceRoutes from "./service.route.js";
import balanceRoutes from "./balance.route.js";
import topUpRoutes from "./topup.route.js";
import transactionRoutes from "./transaction.route.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: 0,
    message: `Sukses`,
  });
});
router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/banner", bannerRoutes);
router.use("/services", serviceRoutes);
router.use("/balance", balanceRoutes);
router.use("/topup", topUpRoutes);
router.use("/transaction", transactionRoutes);

export default router;
