const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

exports.getUserProfile = asyncHandler(async (req, res) => {
  const profile = await userService.fetchUserProfile(req.user.id);
  res.json({ success: true, message: "User Profile", data: profile });
});

exports.updateUserSettings = asyncHandler(async (req, res) => {
  const updated = await userService.updateUser(req.user.id, req.body);
  res.json({ success: true, message: "Settings updated", data: updated });
});
