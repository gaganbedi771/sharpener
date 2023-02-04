const express=require("express");
const router=express.Router();
const productController=require("../controllers/products")

router.use(productController.errorPage);

module.exports=router;