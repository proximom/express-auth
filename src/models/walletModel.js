const mongoose = require("mongoose");
const { SUPPORTED_BLOCKCHAINS } = require("../utils/enum/blockchain");

const walletSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, index: true },
  blockchain: { type: String, enum: SUPPORTED_BLOCKCHAINS, required: true },
  connectionId: { type: String },
  isPrimary: { type: Boolean, default: false },
  tokens: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

walletSchema.index({ walletAddress: 1, blockchain: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Wallet", walletSchema);
