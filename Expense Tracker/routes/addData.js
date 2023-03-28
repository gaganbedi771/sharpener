const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

//adding data to db
router.use("/add-expense", controllers.addExpense);

module.exports = router;