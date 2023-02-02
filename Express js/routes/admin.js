const express=require("express");
const { dirname } = require("path");
const router=express.Router();
const path=require('path');
const rootDir=require('../util/path');

///admin already in use as filter
router.get("/add-product",(req,res,next)=>{
    //console.log("In middleware");
    //res.send('<h1>Hello from exsdfsdfsdpress</h1>');
    res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.send('<form action=/admin/product method="POST"><input type="text" name="product" placeholder="Product Name"><input type="number" name="quantity" placeholder="quantity"><button type="submit">Add Product</button></form>')
    //next();
})

router.post("/product",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
})

module.exports=router;