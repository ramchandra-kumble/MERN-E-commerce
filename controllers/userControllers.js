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

// @desc get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("success");
});
module.exports = { authUser, getUserProfile };
