const express = require("express");
const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/authValidation");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refresh);

// Protected Routes
router.post("/logout", protect, logout);

module.exports = router;
