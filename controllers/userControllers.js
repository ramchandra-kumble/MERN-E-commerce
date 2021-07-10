const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const generateToken = require("../utils/generateToken");

// @desc Auth the user & get a token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { password, _id, ...others } = user._doc;

    res.status(200).json({ _id, ...others, token: generateToken(_id) });
  } else {
    res.status(401).json("Wrong username or password!");
  }
});

// @desc regiter a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("user already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const { password, __v, createdAt, updatedAt, _id, ...others } = user._doc;
    res.status(201).json({
      _id,
      ...others,
      token: generateToken(_id),
    });
  } else {
    res.status(400).json("invalid user data");
  }
});

// @desc get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { password, __v, createdAt, updatedAt, ...others } = user._doc;
    res.status(200).json({ ...others });
  } else {
    res.status(404).json("USER NOT FOUND");
  }
});
module.exports = { authUser, registerUser, getUserProfile };