const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const morgan = require("morgan")

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

dotenv.config();

connectDB();

app.use(express.json());



app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'/client/build')))
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use("/uploads", express.static(path.join(__dirname,"/uploads")));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
  console.log(
    `Stated express server at ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
