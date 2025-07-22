const express = require("express");
const { protect,authorize } = require("../middlewares/authMiddleware");
const walletController = require("../controllers/walletController");

const router = express.Router();

router.use(protect); // all routes below require JWT

router.post("/user/create", walletController.addWallet);
router.get("/user/get", walletController.getWallets);
router.delete("/user/:walletId", walletController.deleteWallet);
router.get("/admin/all", protect, authorize("admin"), walletController.adminGetWallets);
router.get("/admin/aggregate-all",protect, authorize("admin"), walletController.adminFetchWalletsAggregate);

module.exports = router;
