const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getMe,addExpoPushToken } = require("../controllers/users");
const { protect } = require("../middlewares/authmiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/expoPushToken", protect, addExpoPushToken);

module.exports = router;
