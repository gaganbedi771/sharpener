const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

//adding data to db
router.post("/add-expense", controllers.addExpense);

module.exports = router;