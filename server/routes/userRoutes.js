const express = require("express");
const {
    getUserProfile,
    registerUser,
    updateUserProfile,
    loginUser,
    logoutUser
} = require("../controllers/userController");

const router = express.Router();
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router
  .route("/profile")
  .get(getUserProfile)
  .put(updateUserProfile);

module.exports = router;