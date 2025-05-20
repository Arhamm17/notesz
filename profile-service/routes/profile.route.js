import express from "express"
import { verifyToken } from "../utils/verifyToken.js"
import {
  createProfile,
  getMyProfile,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller.js"

const router = express.Router()

router.get("/", verifyToken, getMyProfile)
router.get("/:userId", getProfileByUserId)
router.post("/", createProfile)
router.put("/update-profile/:userId", verifyToken, updateProfile)
router.delete("/:userId", verifyToken, deleteProfile)

export default router