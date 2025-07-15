const User = require("../user/userModel");

exports.fetchDashboardStats = async () => {
  // Mocked values; replace with real aggregation later
  return {
    usersCount: await User.countDocuments(),
    recentLogins: 24,
    reportsPending: 4
  };
};

exports.removeUser = async (userId) => {
  const deleted = await User.findByIdAndDelete(userId);
  if (!deleted) throw new Error("User not found");
  return { id: deleted._id, email: deleted.email };
};
