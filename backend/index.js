import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userProfileRoutes from "./routes/profile.route.js"

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware (should be before routes)
app.use(express.json()); // Parse JSON body
app.use(cookieParser()); // Parse cookies
app.use(cors({
  origin: ["http://localhost:5173"], // Your frontend port
  credentials: true,
}));

app.use("/api/profile", userProfileRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Import routes
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

// Register routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Global error handler (keep at the bottom)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error"; // fixed typo

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
