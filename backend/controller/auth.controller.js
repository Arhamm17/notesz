import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserProfile from "../models/profile.model.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const isValidUser = await User.findOne({ email });

    if (isValidUser) {
      return next(errorHandler(400, "User already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    
 try {
    await UserProfile.create({
      userId: newUser._id,
      email: newUser.email,
      fullName: newUser.username,
      phoneNumber: null,
      bio: "",
    });
  } catch (profileErr) {
    return next(errorHandler(500, "User created but profile creation failed"));
  }


    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("SIGNIN REQUEST BODY:", req.body); // Debug log

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Wrong credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Optional: token expiry
    });

    const { password: hashedPassword, ...userData } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "Lax", // adjust for frontend/backend communication
        secure: false,   // change to `true` if using HTTPS
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: userData,
        
      });
      
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
