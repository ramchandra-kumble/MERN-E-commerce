const express = require("express");
const router = express.Router();
const { authUser, getUserProfile } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
