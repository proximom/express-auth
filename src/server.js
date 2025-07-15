require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/db");
const { log, error } = require("./config/logger");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    error("❌ Failed to connect to MongoDB");
    error(err.stack);
    process.exit(1);
  });
