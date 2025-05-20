import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import {
  createProfile,
  getMyProfile,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
} from "../controller/profile.controller.js"

const router = express.Router()

// Authenticated user's own profile
router.get("/", verifyToken, getMyProfile)

// Public or admin view by userId
router.get("/:userId", getProfileByUserId)

// Create profile (usually right after signup)
router.post("/", verifyToken, createProfile)

// Update profile
router.put("/update-profile/:userId", verifyToken, updateProfile)

// Delete profile
router.delete("/:userId", verifyToken, deleteProfile)

export default router
