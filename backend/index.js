const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.route');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

// Start the server
app.listen(port, process.env.HOSTNAME, () => {
  console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`);
});

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "Welcome to the Profile Page",
  });
});