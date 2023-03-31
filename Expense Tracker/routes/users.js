const express=require("express");
const router=express.Router();
const controllers=require("../controllers/controllers")

router.use("/signup",controllers.signUp);

module.exports=router;