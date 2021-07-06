const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const products = require("./data/products");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();
app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(8000, (req, res) => {
  console.log("Stated express server at 8000");
});
