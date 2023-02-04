const express=require("express");
const router=express.Router();

const { dirname } = require("path");

const path=require('path');
const rootDir=require('../util/path');

///admin already in use as filter
const productsController=require("../controllers/products")

router.get("/add-product", productsController.getAddProduct);

router.post("/product",productsController.postAddProduct)

module.exports=router;