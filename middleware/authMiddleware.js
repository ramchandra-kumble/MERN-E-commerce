const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json("Not autherized Token Failed!");
    }
  }
  if (!token) {
    res.status(401).json("NO Autherization, No Token");
  }
};

module.exports = { protect };
