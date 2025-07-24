import express from "express";
// Methods
import {
  getMe,
  updateProfile,
  updateProfileImage,
} from "../controllers/user.controller.js";

// Middleware
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Routes
router.get("/profile", authenticate, getMe);
router.put("/profile/update", authenticate, updateProfile);
router.put(
  "/profile/image",
  authenticate,
  upload.single("file"),
  updateProfileImage
);

export default router;
