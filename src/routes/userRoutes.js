const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getUserProfile, updateUserSettings } = require("../controllers/userController");

const router = express.Router();

router.use(protect);

router.get("/profile", getUserProfile);
router.put("/settings", updateUserSettings);

module.exports = router;
