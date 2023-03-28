const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

//delete data
router.use("/deleteExpense/:id", controllers.deleteExpense);

module.exports = router;