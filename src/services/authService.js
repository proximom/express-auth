const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

exports.registerUser = async ({ name, email, password, role }) => {
  console.log(`[SERVICE] registerUser called with email: ${email}`);

  const existing = await User.findOne({ email });
  if (existing) {
    console.warn(`[SERVICE] Email already registered: ${email}`);
    throw new Error("Email already registered");
  }

  const hashed = await bcrypt.hash(password, 10);
  console.log(`[SERVICE] Password hashed for email: ${email}`);

  const user = await User.create({ name, email, password: hashed, role });
  console.log(`[SERVICE] New user created: ${user._id}`);

  return { id: user._id, name: user.name, email: user.email };
};

const generateToken = (payload, expiresIn) => {
  console.log(`[SERVICE] Generating JWT token with payload: ${JSON.stringify(payload)}, expiresIn: ${expiresIn}`);
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

exports.loginUser = async ({ email, password }) => {
  console.log(`[SERVICE] loginUser called with email: ${email}`);

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.warn(`[SERVICE] Invalid credentials for email: ${email}`);
    throw new Error("Invalid credentials");
  }

  console.log(`[SERVICE] Credentials verified for email: ${email}`);

  const accessToken = generateToken({ id: user._id, role: user.role }, "1d");
  const refreshToken = generateToken({ id: user._id }, "7d");

  user.refreshTokens.push(refreshToken);
  await user.save();

  console.log(`[SERVICE] Tokens generated and refreshToken saved for userId: ${user._id}`);

  return { accessToken, refreshToken };
};

exports.refreshAccessToken = async (refreshToken) => {
  console.log(`[SERVICE] refreshAccessToken called`);

  const decoded = jwt.verify(refreshToken, JWT_SECRET);
  console.log(`[SERVICE] Refresh token decoded: ${JSON.stringify(decoded)}`);

  const user = await User.findById(decoded.id);
  if (!user || !user.refreshTokens.includes(refreshToken)) {
    console.warn(`[SERVICE] Invalid refresh token for userId: ${decoded.id}`);
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateToken({ id: user._id, role: user.role }, "1d");
  console.log(`[SERVICE] New access token generated for userId: ${user._id}`);

  return newAccessToken;
};

exports.logoutUser = async (userId, refreshToken) => {
  console.log(`[SERVICE] logoutUser called for userId: ${userId}`);

  await User.findByIdAndUpdate(userId, {
    $pull: { refreshTokens: refreshToken },
  });

  console.log(`[SERVICE] Refresh token removed from userId: ${userId}`);
};
