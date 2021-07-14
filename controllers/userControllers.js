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
    res.status(401);
    throw new Error("Invalid USERNAME OR PASSWORD!");
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

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404).json("USER NOT FOUND");
  }
});

// @desc Get all users
// @route GET/api/users
//@acess Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc Delete users
// @route Delete/api/users/:id
//@acess Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "user removed " });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get users by ID
// @route GET/api/users/:id
//@acess Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user
// @route PUT/api/users/:ID
//@acess Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404).json("USER NOT FOUND");
  }
});

module.exports = {
  updateUserProfile,
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
