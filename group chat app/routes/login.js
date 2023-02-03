const express=require("express");
const router=express.Router();
const path=require("path");
const rootDir=require("../util/path");

router.get("/login",(req,res,next)=>{
    res.sendFile(path.join(rootDir,"views","login.html"))
})

module.exports=router;