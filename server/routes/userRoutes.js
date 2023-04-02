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
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router
  .route("/profile")
  .get(isAuthenticatedUser, getUserProfile)
  .put(isAuthenticatedUser, updateUserProfile);

module.exports = router;
