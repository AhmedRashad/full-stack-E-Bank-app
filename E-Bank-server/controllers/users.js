const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

//import sendEmail from "../utility/mailer";
const ObjectId = mongoose.Types.ObjectId;



// @desc Register new user
// @route Post /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error("Please add fields");
  }
  // check if user exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      admin: user.admin,
      status: user.status,
      expoPushToken: user.expoPushToken,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

 

  res.status(201).json(token);
});

// @desc Authenticate auser
// @route Post /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        admin: user.admin,
        status: user.status,
        expoPushToken: user.expoPushToken,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
 

    res.json(token);
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// @desc get user data
// @route Get /api/users
// @access private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: ObjectId(req.user.id),
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "_id",
        foreignField: "user",
        as: "accounts",
      },
    },
    {
      $project: {
        accounts: 1,
      },
    },
  ]);
  res.status(200).json(user);
});


// @desc make user admin
// @route Put /api/users/:id/admin
// @access private
const makeAdmin = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  user.admin = true;
  await user.save();
  res.status(200).json(user);
});

// @desc get all users with accounts for each user
// @route GET /api/users
// @access private for admin only
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: "accounts",
        localField: "_id",
        foreignField: "user",
        as: "accounts",
      },
    },
    {
      $match: {
        admin: false,
      },
    },
    {
      $sort: {
        status: -1,
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        phone: 1,
        admin: 1,
        status: 1,
        accounts: 1,
      },
    },
  ]);
  res.status(200).json(users);
});

// @desc approve user
// @route POST /api/users/:id/approve
// @req body contains approve boolean
// @access private for admin only

const approveUser = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  const status = req.body.status;

  const user = await User.findOne({ _id });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  user.status = status;
  await user.save();
  res.status(200).json(user);
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json(req.params.id);
});

// @desc   add expo push token to user
// @route  PUT /users/expopushtoken
// @access Private
const addExpoPushToken = asyncHandler(async (req, res) => {
  console.log("req.body",req.body);
  const { expoToken } = req.body;
  console.log('addExpoPushToken', expoToken);
  const user= await User.findById(req.user.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  user.expoPushToken = expoToken;
  await user.save();
  res.status(200).json(user);
}
);




module.exports = {
  registerUser,
  loginUser,
  getMe,
  makeAdmin,
  getAllUsers,
  approveUser,
  deleteUser,
  addExpoPushToken,
};
