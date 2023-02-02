const express=require('express');
const router=express.Router();
const rootDir=require('../util/path');
const path=require('path');


router.get("/",(req,res,next)=>{
    //console.log("In middleware again");
    res.sendFile(path.join(rootDir,'views','shop.html'))
    //res.send('<h1>Main Page</h1>');
    //res.send( { key1: 'value' });
})

module.exports=router;