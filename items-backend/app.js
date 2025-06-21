const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");
const { connectDB } = require("./config/database");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://items-assignment.vercel.app",
      "http://localhost:3000"
    ],
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

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

connectDB();

app.use("/items", itemRoutes);

module.exports = app;
// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// })