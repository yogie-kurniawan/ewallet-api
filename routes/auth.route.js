import express from "express";
// Methods
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// Routes
router.post("/registration", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
