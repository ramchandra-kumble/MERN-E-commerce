const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes")

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes)


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
  console.log(
    `Stated express server at ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
