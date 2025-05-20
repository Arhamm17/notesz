import mongoose from "mongoose"

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // 1-to-1 relationship
  },
  fullName: {
    type: String,
    default: "",
  },
  email :{
  type: String,
  default: "",
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  
  bio: {
    type: String,
    default: "",
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  accountStatus: {
    type: String,
    enum: ["Active", "Suspended", "Deleted"],
    default: "Active",
  },
})

const UserProfile = mongoose.model("UserProfile", userProfileSchema)

export default UserProfile
