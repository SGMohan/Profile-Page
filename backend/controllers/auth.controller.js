const UserModel = require("../model/user.model");
const ProfileModel = require("../model/profile.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required: name, email, and password",
      success: false,
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    await ProfileModel.create({ userId: user._id });
    
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Account creation failed",
      success: false,
      error: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      message: "Both email and password are required",
      success: false,
    });
  }

  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Invalid login credentials",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    let profile = await ProfileModel.findOne({ userId: user._id });
    if (!profile) {
      await ProfileModel.create({ userId: user._id });
    }

    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Authentication service unavailable",
      success: false,
      error: error.message,
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { register, login, logout };
