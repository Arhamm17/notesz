import UserProfile from "../models/profile.model.js"
import { errorHandler } from "../utils/error.js"

// Create a new profile
export const createProfile = async (req, res, next) => {
  const { userId, fullName, phoneNumber, bio } = req.body

  try {
    const existing = await UserProfile.findOne({ userId })
    if (existing) {
      return next(errorHandler(400, "Profile already exists"))
    }

    const profile = await UserProfile.create({
      userId,
      fullName,
      email,
      phoneNumber,
      bio,
    })

    res.status(201).json({ success: true, profile })
  } catch (err) {
    next(errorHandler(500, "Error creating profile"))
  }
}

// Get current authenticated user's profile
export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id })

    if (!profile) {
      return next(errorHandler(404, "Profile not found"))
    }

    res.status(200).json({ success: true, profile })
  } catch (err) {
    next(errorHandler(500, "Error fetching profile"))
  }
}

// Get profile by userId
export const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId })

    if (!profile) {
      return next(errorHandler(404, "Profile not found"))
    }

    res.status(200).json({ success: true, profile })
  } catch (err) {
    next(errorHandler(500, "Error fetching profile"))
  }
}

// Update profile
export const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.params.userId },
      updates,
      { new: true }
    )

    if (!profile) {
      return next(errorHandler(404, "Profile not found"))
    }

    res.status(200).json({ success: true, profile })
  } catch (err) {
    next(errorHandler(500, "Error updating profile"))
  }
}

// Delete profile
export const deleteProfile = async (req, res, next) => {
  try {
    const profile = await UserProfile.findOneAndDelete({ userId: req.params.userId })

    if (!profile) {
      return next(errorHandler(404, "Profile not found"))
    }

    res.status(200).json({ success: true, message: "Profile deleted successfully" })
  } catch (err) {
    next(errorHandler(500, "Error deleting profile"))
  }
}
