const express=require("express");
const router=express.Router();

const path=require("path");


router.get("/contactus",(req,res,next)=>{
    res.sendFile()
})

module.exports=router;