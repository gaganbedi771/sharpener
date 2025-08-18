const express = require("express");
const userController=require("../controllers/userController");
const router = express.Router();


router.post("/",userController.addUser);
router.get("/",userController.getAllUsers);
router.post("/booking",userController.userBooking);
router.get("/booking/:id",userController.getBookingsByUser);



module.exports=router;