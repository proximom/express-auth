const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const limiter = require('./middlewares/rateLimiterMiddleware')
const testRoutes = require("./test/testRoutes");
const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const walletRoutes = require("./routes/walletRoutes");

const app = express();

// ✅ Security & sanitization middlewares
app.use(helmet());
app.use(express.json());
// app.use(xss());
// app.use(mongoSanitize());

app.use(limiter);

// ✅ Routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wallets", walletRoutes);
// POST /ozow/notify
app.post("/ozow/notify", (req, res) => {
    console.log("✅ Ozow Notify Received:", req.body); // Log everything
    res.status(200).json({
        message: "Notify received",
        data: req.body,
    });
});

// ✅ Final error handler (must be last)
app.use(errorHandler); // <- From your errorMiddleware.js

module.exports = app;
