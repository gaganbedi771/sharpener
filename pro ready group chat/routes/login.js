const express=require("express");
const router=express.Router();
const loginControl= require("../controllers/loginControl");

router.use("/signup",loginControl.signup);

module.exports=router;