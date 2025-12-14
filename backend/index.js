const express = require('express');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const connectDB = require('./config/db');
const { client, connectRedis } = require('./config/redis');
const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.route');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();
connectRedis();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(session({
  store: new RedisStore({ client: client }),
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "Welcome to the Profile Page",
  });
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});