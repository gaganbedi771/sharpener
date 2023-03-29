const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

//delete data
router.delete("/deleteExpense/:id", controllers.deleteExpense);

module.exports = router;