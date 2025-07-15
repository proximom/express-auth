const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const testRoutes = require("./test/testRoutes");
const authRoutes = require("./auth/authRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

// ✅ Security & sanitization middlewares
app.use(helmet());
app.use(express.json());
// app.use(xss());
// app.use(mongoSanitize());

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// ✅ Routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);

// ✅ Final error handler (must be last)
app.use(errorHandler); // <- From your errorMiddleware.js

module.exports = app;
