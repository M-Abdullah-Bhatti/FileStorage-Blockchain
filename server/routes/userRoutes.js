const express = require("express");
const {
  getUserProfile,
  registerUser,
  updateUserProfile,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/profile").put(updateUserProfile);
router.route("/profile/:email").get(getUserProfile);
module.exports = router;
