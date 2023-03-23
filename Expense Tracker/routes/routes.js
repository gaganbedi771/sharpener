const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

router.use("/add-expense", controllers.addExpense);
router.use("/getAll", controllers.getAll); //for DOM loading

router.use("/deleteExpense/:id", controllers.deleteExpense);
router.use("/getDetail/:id", controllers.getDetail); //for prefilling the form
router.use("/updateDetails/:id", controllers.updateDetails);


module.exports = router;