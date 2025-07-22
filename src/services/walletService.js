const Wallet = require("../models/walletModel");
const { log, error } = require("../config/logger");

exports.addWallet = async ({ userId, walletAddress, blockchain, connectionId, isPrimary }) => {
  try {
    const existingWallet_BC = await Wallet.findOne({ walletAddress, blockchain });
    if (existingWallet_BC) throw new Error("Wallet already registered on this blockchain");

    const existing = await Wallet.findOne({ user: userId, walletAddress, blockchain });
    if (existing) throw new Error("Wallet already added for this user on this blockchain");

    const wallet = await Wallet.create({ user: userId, walletAddress, blockchain, connectionId, isPrimary });
    log(`Wallet added for user ${userId}: ${walletAddress} on ${blockchain}`);
    return wallet;
  } catch (err) {
    error(err.message);
    throw err;
  }
};

exports.getUserWallets = async ({ userId, page = 1, limit = 10, search, blockchain }) => {
  try {
    const query = { user: userId };

    if (search) query.walletAddress = { $regex: search, $options: "i" };
    if (blockchain) query.blockchain = blockchain;

    const wallets = await Wallet.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user", "name email role");

    const total = await Wallet.countDocuments(query);
    log(`Wallets fetched for user ${userId}`);

    return { wallets, total, page, pages: Math.ceil(total / limit) };
  } catch (err) {
    error(err.message);
    throw err;
  }
};

exports.deleteWallet = async ({ userId, walletId }) => {
  try {
    const wallet = await Wallet.findOneAndDelete({ _id: walletId, user: userId });
    if (!wallet) throw new Error("Wallet not found or not authorized");

    log(`Wallet deleted: ${walletId} by user ${userId}`);
    return wallet;
  } catch (err) {
    error(err.message);
    throw err;
  }
};

exports.getAllWalletsAdmin = async ({ page = 1, limit = 10, search, blockchain, userEmail }) => {
  try {
    const query = {};
    console.time("DB_QUERY_TIME");

    if (search) query.walletAddress = { $regex: search, $options: "i" };
    if (blockchain) query.blockchain = blockchain;

    // Optional: filter by user's email (useful for admin)
    if (userEmail) {
      query.user = await Wallet.db.model("User").findOne({ email: userEmail }).select("_id");
      if (!query.user) return { wallets: [], total: 0, page, pages: 0 }; // No such user
    }

    const total = await Wallet.countDocuments(query);

    const wallets = await Wallet.find(query)
      .populate("user", "name email role")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    console.timeEnd("DB_QUERY_TIME");

    log(`[ADMIN] Wallets fetched: page=${page}, limit=${limit}`);
    return { wallets, total, page, pages: Math.ceil(total / limit) };
  } catch (err) {
    error(`[ADMIN] Failed to fetch wallets: ${err.message}`);
    throw err;
  }
};


exports.getAllWalletsByAdminAggregate = async (filters) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      blockchain,
      isPrimary,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = filters;

    const matchStage = {};
    console.time("DB_QUERY_TIME");

    if (search) {
      matchStage.walletAddress = { $regex: search, $options: "i" };
    }
    if (blockchain) {
      matchStage.blockchain = blockchain;
    }
    if (typeof isPrimary !== "undefined") {
      matchStage.isPrimary = isPrimary === "true";
    }

    const sortStage = {};
    sortStage[sortBy] = sortOrder === "asc" ? 1 : -1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const startTime = Date.now();

    const wallets = await Wallet.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          walletAddress: 1,
          blockchain: 1,
          connectionId: 1,
          isPrimary: 1,
          createdAt: 1,
          "user.name": 1,
          "user.email": 1,
          "user.role": 1,
        },
      },
      { $sort: sortStage },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ]);
    console.timeEnd("DB_QUERY_TIME");

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    log(`🔍 Aggregation query fetched ${wallets.length} wallets in ${executionTime}ms`);

    return { wallets, executionTime };
  } catch (err) {
    error("❌ Error in getAllWalletsByAdminAggregate");
    error(err.message);
    throw err;
  }
};
