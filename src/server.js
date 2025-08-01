require("dotenv").config();
const os = require("os");
const app = require("./app");
const connectDB = require("./config/db");
const { log, error } = require("./config/logger");

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // Allow access from local network

// Helper to get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// Mount health check route BEFORE starting app
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "✅ Server is alive!" });
}); 

connectDB()
  .then(() => {
    app.listen(PORT, HOST, () => {
      log(`🚀 Server running locally at http://localhost:${PORT}`);
      log(`🌐 Server accessible on network at http://${getLocalIP()}:${PORT}`);
    });
  })
  .catch((err) => {
    error("❌ Failed to connect to MongoDB");
    error(err.stack);
    process.exit(1);
  });
