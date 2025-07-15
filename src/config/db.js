const mongoose = require("mongoose");
const { log, error } = require("./logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    error("❌ MongoDB connection failed");
    throw err;
  }
};

module.exports = { connectDB };
