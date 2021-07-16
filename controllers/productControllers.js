const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel.js");

// @desc Fetch all Products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}
 
  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword}).limit(pageSize).skip(pageSize * (page -1));
  res.json({products, page, pages: Math.ceil(count / pageSize)});
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


// @desc create new review
// @route POST /api/products/:id/reviews
// @access private

const createProductReview = asyncHandler(async (req, res) => {

  const {rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if(product) {
  const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
 
if(alreadyReviewed){
   res.status(400)
   throw new Error('Product already reviewed')
 }

 const review = {
  name: req.user.name,
  rating: Number(rating),
  comment,
  user: req.user._id
}

product.reviews.push(review)

product.numReviews = product.reviews.length

product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0)
/product.reviews.length

await product.save()

res.status(201).json({message: "Review Added"})
  }else {
    res.status(404);
    throw new Error("Product not Found");
  }
})


// @desc get top rated products
// @route GET /api/products/top
// @access public

const getTopProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({}).sort({rating: -1}).limit(3)
 
  res.json(products)
})


module.exports = { 
  getProducts, 
  getProductById, 
  deleteProduct, 
  updateProduct, 
  createProduct, 
  createProductReview,
 getTopProducts};
