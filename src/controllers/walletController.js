const walletService = require("../services/walletService");
const { log, error } = require("../config/logger");

exports.addWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { walletAddress, blockchain, connectionId, isPrimary } = req.body;

    const wallet = await walletService.addWallet({ userId, walletAddress, blockchain, connectionId, isPrimary });
    res.status(201).json({ success: true, message: "Wallet added", data: wallet });
  } catch (err) {
    error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getWallets = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit, search, blockchain } = req.query;

    const result = await walletService.getUserWallets({
      userId,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search,
      blockchain,
    });

    res.json({ success: true, message: "Wallets fetched", data: result });
  } catch (err) {
    error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { walletId } = req.params;

    const deleted = await walletService.deleteWallet({ userId, walletId });
    res.json({ success: true, message: "Wallet deleted", data: deleted });
  } catch (err) {
    error(err.message);
    res.status(404).json({ success: false, message: err.message });
  }
};

exports.adminGetWallets = async (req, res) => {
  try {
    const { page, limit, search, blockchain, userEmail } = req.query;

    const result = await walletService.getAllWalletsAdmin({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search,
      blockchain,
      userEmail,
    });

    res.json({ success: true, message: "All wallets fetched (admin)", data: result });
  } catch (err) {
    error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.adminFetchWalletsAggregate = async (req, res) => {
  try {
    const { wallets, executionTime } = await walletService.getAllWalletsByAdminAggregate(req.query);
    res.json({
      success: true,
      message: `Wallets fetched using aggregation in ${executionTime}ms`,
      data: wallets,
    });
  } catch (err) {
    error("❌ Failed to fetch wallets (aggregation)");
    error(err.stack);
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};
