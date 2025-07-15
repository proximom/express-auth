// src/test/testRoutes.js
const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/user-only", protect, (req, res) => {
  res.json({ success: true, message: "Hello authenticated user!", data: req.user });
});

router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.json({ success: true, message: "Welcome Admin!", data: req.user });
});

module.exports = router;
