const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel.js");

// @desc Fetch all Products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch a single Product
// @route GET /api/product/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// @desc delete a single Product
// @route DELETE /api/product/:id
// @access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
     await product.remove();
     res.json({message: "Product Removed !"});
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// @desc create a single Product
// @route POST /api/product/:id
// @access privete/Admin

const createProduct = asyncHandler(async (req, res) => {

  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample Description"
  })

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);

})

// @desc update a single Product
// @route PUT /api/product/:id
// @access privete/Admin

const updateProduct = asyncHandler(async (req, res) => {

  const {name,price,description,image,brand,category,countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if(product) {

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

  const updatedproduct = await product.save();
  res.json(updatedproduct);
  }else {
    res.status(404);
    throw new Error("Product not Found");
  }
})


module.exports = { getProducts, getProductById, deleteProduct, updateProduct,createProduct };
