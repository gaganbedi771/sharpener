const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.post("/", expenseController.addExpense);
router.patch("/:id", expenseController.editExpenseById);
router.delete("/:id", expenseController.deleteExpenseById);

module.exports = router;
