const asyncHandler = require("express-async-handler");
const adminService = require("../services/adminService");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await adminService.fetchDashboardStats();
  res.json({ success: true, message: "Admin Dashboard Stats", data: stats });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const result = await adminService.removeUser(req.params.id);
  res.json({ success: true, message: "User deleted", data: result });
});
