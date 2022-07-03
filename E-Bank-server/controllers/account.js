const asyncHandler = require("express-async-handler");

const Account = require("../models/account");
const User = require("../models/user");
const generateUniqueId = require('generate-unique-id');

const sendPushNotification = require("../utilities/pushNotification");

// @desc   add account and add account to user
// @route  Post /api/newAccount
// @access Private
const addAccount = asyncHandler(async (req, res) => {
   
  const account = await Account.create({
    ...req.body,
    account_number:generateUniqueId({
      length: 10,
      useLetters: false,
      useNumbers: true,
    }),
    user: req.user.id,
  });
  res.status(201).json(account);
});

// @desc   Get account by id
// @route  GET /api/accounts/:id
// @access Private
const getAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  res.status(200).json(account);
});

// @desc   transfer money to another account
// @route  PUT /api/accounts/transfer/:id
// @access Private to user
const transferMoney = asyncHandler(async (req, res) => {
  const user1 = await User.findById(req.user.id);
  const account = await Account.findById(req.params.id);
  const account2 = await Account.findOne({
    account_number: req.body.account_number,
  });
  const user2 = await User.findById(account2.user);
  if (!account2) {
    res.status(404);
    throw new Error("Account not found");
  }
  if (account.current_balance < req.body.amount) {
    res.status(400).json({ message: "Insufficient funds" });
  } else {
    account.current_balance -= Number(req.body.amount);
    account2.current_balance += Number(req.body.amount);
    await account.save();
    await account2.save();
    sendPushNotification(user2.expoPushToken, `${user1.name} has transferred ${req.body.amount}$ to you`);
    res.status(200).json(account);
  }
});

// @desc   Charge money from account
// @route  PUT /api/accounts/charge/:id
// @access Private to user
const chargeMoney = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);
  const user= await User.findById(req.user.id);
  if (account.current_balance < req.body.amount) {
    res.status(400).json({ message: "Insufficient funds" });
  } else {
    account.current_balance -= Number(req.body.amount);
    await account.save();
    sendPushNotification(user.expoPushToken, `${req.body.amount}$ has been charged`);
    res.status(200).json(account);
  }
});

// @desc   Deposit money to account
// @route  PUT /api/accounts/deposit/:id
// @access Private to user
const depositMoney = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const account = await Account.findById(req.params.id);
  console.log('req.body.amount', req.body.amount);
  console.log('account.current_balance', account.current_balance);
  
  account.current_balance += Number(req.body.amount);
  await account.save();
  sendPushNotification(user.expoPushToken, `${req.body.amount}$ has been deposited`);
  res.status(200).json(account);
});

// @desc   Get all accounts for user
// @route  GET /api/accounts/user
// @access Private to user
const getUserAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({ user_id: req.params.id });
  if (!accounts) {
    res.status(404);
    throw new Error("Accounts not found");
  }
  res.status(200).json(accounts);
});
module.exports = {
  addAccount,
  getAccount,
  transferMoney,
  chargeMoney,
  depositMoney,
  getUserAccounts,
};
