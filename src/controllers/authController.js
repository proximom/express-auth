const asyncHandler = require("express-async-handler");
const authService = require("../services/authService");

exports.register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json({ success: true, message: "User registered", data: user });
});

exports.login = asyncHandler(async (req, res) => {
  const tokens = await authService.loginUser(req.body);
  res.status(200).json({ success: true, message: "Login successful", data: tokens });
});

exports.refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const newAccessToken = await authService.refreshAccessToken(refreshToken);
  res.status(200).json({ success: true, message: "Token refreshed", data: { accessToken: newAccessToken } });
});

exports.logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  await authService.logoutUser(req.user.id, refreshToken);
  res.status(200).json({ success: true, message: "Logged out", data: null });
});
