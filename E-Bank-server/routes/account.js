const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authmiddleware");

const {
  addAccount,
  getAccount,
  transferMoney,
  chargeMoney,
  depositMoney,
  getUserAccounts,
} = require("../controllers/account");

router.post("/",protect,addAccount);
router.get("/:id", getAccount);

// get accounts by user
router.get("/user", getUserAccounts);
// transfer money to another account
router.put("/transfer/:id",protect, transferMoney);
// charge money from account
router.put("/charge/:id",protect, chargeMoney);
// deposit money to account
router.put("/deposit/:id",protect, depositMoney);

module.exports = router;
