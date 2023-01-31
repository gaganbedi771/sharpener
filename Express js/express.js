//const bodyParser= require('body-parser');

const express=require('express');
const app=express();

//app.use (bodyParser.urlencoded());


//app.use("/add-product",(req,res,next)=>{
    //res.send('<form action=/product method="POST"><input type="text" name="product"><button type="submit">Add Product</button></form>')
//})

//app.post("/product",(req,res,next)=>{
    //console.log(req.body);
    //res.redirect("/");
//})

// app.use("/",(req,res,next)=>{
//     res.setHeader=302;
//     res.send("<h1>Hello</h1>")
// })

app.use((req,res,next)=>{
    console.log("In middleware");
    next();
})

app.use((req,res,next)=>{
    console.log("In middleware again");
    //res.send('<h1>Hello from express</h1>');
    res.send( { key1: 'value' });
})

app.listen(3000);