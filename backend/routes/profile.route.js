const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profile.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, upload.single("image"), updateProfile);

module.exports = router;
