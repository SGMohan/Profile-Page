const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: [1, "Age must be at least 1"],
      max: [110, "Age cannot exceed 110"],
    },
    dob: {
      type: Date,
    },
    contact: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: [1000, "Bio cannot be more than 1000 characters"],
    },
    image: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

const ProfileModel = mongoose.model("profile", profileSchema);
// console.log("Profile Model Created Successfully", ProfileModel);
module.exports = ProfileModel;
