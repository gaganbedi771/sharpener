const express=require("express");
const router=express.Router();

const maincontroller=require("../controllers/mainController");

router.use("/update/:id",maincontroller.updateUser);

router.use("/delete/:id",maincontroller.deleteUser);

router.use("/getUser/:id",maincontroller.getUser);


module.exports=router;