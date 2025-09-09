import express from "express";
import { getProfile, login, logout, signup } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/profile",protectRoute,getProfile)

export default router