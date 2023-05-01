const express=require("express");
const router=express.Router();
const loginControl= require("../controllers/loginControl");

router.post("/signup",loginControl.signup);
router.post("/signin",loginControl.signin);

module.exports=router;