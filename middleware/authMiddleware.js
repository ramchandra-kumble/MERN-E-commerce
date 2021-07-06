const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  console.log(token);

  next();
};

module.exports = { protect };
