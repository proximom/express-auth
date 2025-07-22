const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs:  60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again after 5 minutes.",
    data: null,
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
