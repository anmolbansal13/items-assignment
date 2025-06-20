const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");
const { connectDB } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json({ limit: "50mb" })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Connect to MongoDB
connectDB();
// Serve uploaded files
app.use("/uploads", express.static("uploads"));
// Routes

app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
