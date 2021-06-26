const express=require('express')
const product=require('./product')

const app= express()
app.get('/',(req,res)=>{
    res.send('API is running')
})

app.get('/api/product',(req,res)=>{
    res.json(product)
})
app.get('/api/product/:id',(req,res)=>{
    const products=product.find(p=>p._id===req.params.id)
    res.json(products)
})

app.listen(5000,console.log('running ')) 