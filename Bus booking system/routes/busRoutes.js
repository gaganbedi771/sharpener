const express = require("express");
const busController=require("../controllers/busController");
const router = express.Router();



router.post("/",busController.addbus);
router.get("/available/:seats",busController.getBusesWithAvailableSeats)


module.exports=router;