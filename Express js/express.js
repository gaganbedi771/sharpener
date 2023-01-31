const express=require('express');
const app=express();

const bodyParser= require('body-parser');
app.use (bodyParser.urlencoded({extended: true}));

app.use("/add-product",(req,res,next)=>{
    //console.log("In middleware");
    //res.send('<h1>Hello from exsdfsdfsdpress</h1>');
    res.send('<form action=/product method="POST"><input type="text" name="product" placeholder="Product Name"><input type="number" name="quantity" placeholder="quantity"><button type="submit">Add Product</button></form>')
    //next();
})

app.post("/product",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
})

app.use("/",(req,res,next)=>{
    //console.log("In middleware again");
    res.send('<h1>Hello from express</h1>');
    //res.send( { key1: 'value' });
})

app.listen(3000);