const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  const isPasswordMatched = await user.matchPassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  if (!user) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }
  res.status(200).json({
    user,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "user already exist" });
    // throw new Error("User already exists");
  }
  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user Data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { username, newEmail, prevEmail } = req.body;
  const userToUpdate = await User.findOne({ email: prevEmail });

  if (!userToUpdate) {
    res.status(404).json({
      message: "User not found",
    });
  }

  userToUpdate.username = username;
  userToUpdate.email = newEmail;
  const updatedUser = await userToUpdate.save();

  res.status(200).json({
    success: true,
    updatedUser,
  });
});

module.exports = {
  getUserProfile,
  registerUser,
  updateUserProfile,
  loginUser,
  logoutUser,
};
