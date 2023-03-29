const express=require("express");
const router=express.Router();
const controllers=require("../controllers/controllers");

router.post("/submit",controllers.submit);
router.get("/getAll",controllers.getAll);
router.delete("/delete/:id",controllers.delete);
router.get("/getProduct/:id",controllers.getProduct);
module.exports=router;