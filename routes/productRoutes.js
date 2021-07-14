const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProduct
} = require("../controllers/productControllers");
const { protect, admin } = require("../middleware/authMiddleware.js");


router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(protect,admin, deleteProduct);

module.exports = router;
