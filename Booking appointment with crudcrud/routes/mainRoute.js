const express=require("express");
const router=express.Router();

const maincontroller=require("../controllers/mainController")

router.get("/register",maincontroller.get);


router.post("/register",maincontroller.put);


module.exports=router;