const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

//for DOM loading
router.get("/getAll", controllers.getAll);

//adding data to db
router.post("/add-expense", controllers.addExpense);

//edit data
router.get("/getDetail/:id", controllers.getDetail); //for prefilling the form
router.patch("/updateDetails/:id", controllers.updateDetails);

//delete data
router.delete("/deleteExpense/:id", controllers.deleteExpense);

module.exports = router;