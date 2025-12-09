const ProfileModel = require("../model/profile.model");
const UserModel = require("../model/user.model");

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let profile = await ProfileModel.findOne({ userId }).populate('userId', 'name email');
    
    if (!profile) {
      const user = await UserModel.findById(userId);
      return res.status(200).json({
        message: "Profile fetched successfully",
        success: true,
        data: { userId: { _id: user._id, name: user.name, email: user.email } },
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch profile",
      success: false,
      error: error.message,
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, age, dob, contact, region, bio } = req.body;

    if (name || email) {
      const userUpdate = {};
      if (name) userUpdate.name = name;
      if (email) userUpdate.email = email;
      await UserModel.findByIdAndUpdate(userId, userUpdate);
    }

    const updateData = { userId, age, dob, contact, region, bio };
    if (req.file) updateData.image = req.file.path;

    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { userId },
      updateData,
      { new: true, upsert: true, runValidators: true }
    ).populate('userId', 'name email');

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update profile",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { getProfile, updateProfile };
