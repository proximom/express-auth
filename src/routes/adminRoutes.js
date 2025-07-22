const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");
const { getDashboardStats, deleteUser } = require("../controllers/adminController");

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/dashboard", getDashboardStats);
router.delete("/user/:id", deleteUser);

module.exports = router;
