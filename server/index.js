const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const sessionConfig = require("./config/session");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

const app = express();

app.use(express.json());

// MongoDB connection string (no .env)
const mongooseConnectionString = "mongodb://localhost:27017/TrackFitx";

// connect db
connectDB(mongooseConnectionString);

// setup session
sessionConfig(app, mongooseConnectionString);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
