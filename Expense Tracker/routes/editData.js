const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

//edit data
router.get("/getDetail/:id", controllers.getDetail); //for prefilling the form
router.patch("/updateDetails/:id", controllers.updateDetails);

module.exports = router;