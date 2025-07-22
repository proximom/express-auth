const User = require("../models/userModel");

exports.fetchUserProfile = async (id) => {
  return await User.findById(id).select("-password -refreshTokens");
};

exports.updateUser = async (id, data) => {
  const allowed = ["name", "email"];
  const filtered = Object.fromEntries(
    Object.entries(data).filter(([k]) => allowed.includes(k))
  );
  return await User.findByIdAndUpdate(id, filtered, { new: true }).select("-password -refreshTokens");
};
