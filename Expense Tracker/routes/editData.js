const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

//edit data
router.use("/getDetail/:id", controllers.getDetail); //for prefilling the form
router.use("/updateDetails/:id", controllers.updateDetails);

module.exports = router;