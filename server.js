const express=require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')


dotenv.config()

connectDB()

const app= express()
app.get('/',(req,res)=>{
    res.send('API is running')
})

app.use('/api/products',productRoutes)
app.use('/api/products/:id',productRoutes)

app.listen(8000, (req, res) => {
    console.log("Stated express server at 8000");
  });

