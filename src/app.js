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
app.use(express.urlencoded({ extended: true })); // for form data bodies from Ozow
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
const crypto = require("crypto");

function getSha512Hash(stringToHash) {
    return crypto.createHash("sha512").update(stringToHash).digest("hex");
}

app.post("/ozow/notify", (req, res) => {
    const {
        SiteCode,
        TransactionId,
        TransactionReference,
        Amount,
        Status,
        Optional1,
        Optional2,
        Optional3,
        Optional4,
        Optional5,
        CurrencyCode,
        IsTest,
        StatusMessage,
        BankName,
        Hash
    } = req.body;

    // Ozow's notify hash field order:
    const stringToHash = 
        `${SiteCode}${TransactionId}${TransactionReference}${Amount}${Status}` +
        `${Optional1}${Optional2}${Optional3}${Optional4}${Optional5}` +
        `${CurrencyCode}${IsTest}${StatusMessage}${BankName}${process.env.OZOW_PRIVATE_KEY}`;

    const calculatedHash = getSha512Hash(stringToHash.toLowerCase());

    console.log("✅ Ozow Notify Received:", req.body);
    console.log("🔍 Calculated Hash:", calculatedHash);
    console.log("📦 Ozow Hash:", Hash);

    if (calculatedHash === Hash.toLowerCase()) {
        console.log("✅ Hash verified — payment notification is authentic.");
        // TODO: mark payment as complete / failed in your DB
        res.status(200).json({ verified: true });
    } else {
        console.error("❌ Hash verification failed — possible tampering!");
        res.status(400).json({ verified: false });
    }
});


// ✅ Final error handler (must be last)
app.use(errorHandler); // <- From your errorMiddleware.js

module.exports = app;
