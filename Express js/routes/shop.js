const express=require('express');
const router=express.Router();

router.get("/",(req,res,next)=>{
    //console.log("In middleware again");
    res.send('<h1>Main Page</h1>');
    //res.send( { key1: 'value' });
})

module.exports=router;